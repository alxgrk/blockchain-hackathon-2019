/**
 * Track the trade of a commodity from one trader to another
 * @param {org.uni.leipzig.aktivist.AktivitaetErfuellt} event - the trade to be processed
 * @transaction
 */
async function aktivitaetErfuellt(event) {

    /**
     * Update taler and punkte
     */
    let benutzer = event.benutzer;

    benutzer.ehrentaler += event.ehrentaler
    benutzer.ehrenpunkte += event.ehrenpunkte

    let benutzerRegistry = await getParticipantRegistry('org.uni.leipzig.aktivist.Benutzer');

    await benutzerRegistry.update(benutzer);

    /**
     * Aktivitaet
     */
    let aktivitaet = event.aktivitaet
    aktivitaet.benutzer = event.benutzer
    
    let benutzerAktivitaeten = event.benutzer.aktivitaeten
    benutzerAktivitaeten.push(aktivitaet)

    let aktivitaetenAssetRegistry = await getAssetRegistry('org.uni.leipzig.aktivist.Aktivitaet');

    await benutzerRegistry.update(event.benutzer)
    await aktivitaetenAssetRegistry.update(aktivitaet);
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.uni.leipzig.aktivist.ZertifikatErhalten} event - the trade to be processed
 * @transaction
 */
async function zertifikateErhalten(event) {
    let benutzerZertifikate = event.benutzer.zertifikate
    
    let zertifikat = event.zertifikat
    benutzerZertifikate.push(zertifikat)

    let benutzerRegistry = await getParticipantRegistry('org.uni.leipzig.aktivist.Benutzer');

    await benutzerRegistry.update(event.benutzer)
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.uni.leipzig.aktivist.EhrentalerAusgegeben} event - the trade to be processed
 * @transaction
 */
async function ehrentalerAusgegeben(event) {
    /**
     * Update taler
     */
    let benutzer = event.benutzer;

    benutzer.ehrentaler -= event.ehrentaler

    let benutzerRegistry = await getParticipantRegistry('org.uni.leipzig.aktivist.Benutzer');

    await benutzerRegistry.update(benutzer);

    /**
     * Update benefits
     */
    let benutzerBenefits = event.benutzer.benefits
    
    let benefit = event.benefit
    benutzerBenefits.push(benefit)

    await benutzerRegistry.update(event.benutzer)
}