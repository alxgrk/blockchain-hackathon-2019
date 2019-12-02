import re as re
import json
import xlrd
import json

# Transform xlsx data into json format
book = xlrd.open_workbook("./../../Infomaterial/Ehrenamtsmanager.xlsx")

print("Worksheet name(s): {0}".format(book.sheet_names()))


#list of get parameter
parameter_list = ['Tätigkeitsbeschreibung', 'Name des Projektes', 'Zeitraum', 'Zeitbedarf', 'Projektbeschreibung',
                  "Anzahl der benötigten Personen", "Voraussetzung/Vorkenntnisse", "sonstige Informationen",
                  "Projektadresse", "Straße", "PLZ", "Bezirk", "Ortsteil", "Kontaktinformationen"]

json_list = []

#interate over the sheets
for i in range(2, book.nsheets):

    #Sheetlist
    sh = book.sheet_by_index(i)

    dictionary = {}
    for rx in range(sh.nrows):

        for j in range(len(parameter_list)):

            if re.search(parameter_list[j], str(sh.row(rx)[0])):
                y = str(sh.row(rx)[1])
                #create a dictionary with one parameter and value
                dictionary[parameter_list[j]] = y[6:-1]

    json_list.append(dictionary)


# write data in json file
json_data_file = open("data.json", "w")

# magic happens here to make it pretty-printed
json_data_file.write(json.dumps(json_list, indent=4, ensure_ascii=False, sort_keys=True, cls=None))
json_data_file.close()














#json_format=json.dumps(json_list,ensure_ascii=False, indent=4))

