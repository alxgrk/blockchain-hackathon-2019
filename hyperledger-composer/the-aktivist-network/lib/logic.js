async function aktivitaetErfuellt(event) {

    /**
     * Update konto
     */
    let konto = event.benutzer.konto;

    konto.ehrentaler += event.ehrentaler
    konto.ehrenpunkte += event.ehrenpunkte

    let kontoAssetRegistry = await getAssetRegistry('org.uni.leipzig.aktivist.Konto');

    await kontoAssetRegistry.update(konto);

    /**
     * Aktivitaet
     */
    let aktivitaet = event.aktivitaet
    
    let benutzerAktivitaeten = event.benutzer.aktivitaeten
    benutzerAktivitaeten += aktivitaet

    let aktivitaetenAssetRegistry = await getAssetRegistry('org.uni.leipzig.aktivist.Aktivitaet');

    await aktivitaetenAssetRegistry.update(benutzerAktivitaeten);
}

// async function tradeCommodity(trade) {
//     trade.commodity.owner = trade.newOwner;
//     let assetRegistry = await getAssetRegistry('org.uni.leipzig.aktivist.Commodity');
//     await assetRegistry.update(trade.commodity);
// }

// async function tradeCommodity(trade) {
//     trade.commodity.owner = trade.newOwner;
//     let assetRegistry = await getAssetRegistry('org.uni.leipzig.aktivist.Commodity');
//     await assetRegistry.update(trade.commodity);
// }