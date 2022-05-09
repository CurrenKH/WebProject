import pymongo
import pandas as pd
from pymongo import MongoClient
import numpy as np
import matplotlib.pyplot as plt
import sys
import uuid
import webbrowser

myclient = MongoClient("mongodb://cfortier:cfortier123@cluster0-shard-00-00.gjdrt.mongodb.net:27017,cluster0-shard-00-01.gjdrt.mongodb.net:27017,cluster0-shard-00-02.gjdrt.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-e0cio3-shard-0&readPreference=primary&ssl=true")


mydb = myclient["sample_supplies"]

#select the collection within the database
collection = mydb.sales


df2 = pd.DataFrame(list(collection.aggregate([
    {  "$match": { "purchaseMethod": sys.argv[1] }
    },
    {"$project": {
        "year": { "$year": "$saleDate" }
    }}, 
    { "$group": {
        "_id": "$year", 
        "total": { "$sum": 1 }
    }},
    {"$sort" : {"_id" : 1}}])))
df2.columns = df2.columns.str.replace('_id', 'year')


years = list(df2['year'])
count = list(df2['total'])

plt.title("Store sale frequency via \n" + sys.argv[1] + " by year", fontsize='x-large', fontweight="bold")
plt.plot(years,count)
plt.xticks([2013, 2014, 2015, 2016, 2017],['2013','2014','2015','2016', '2017'])
listOf_Yticks = np.arange(150, 450, 50)
plt.yticks(listOf_Yticks)
plt.xlabel("Year")
plt.ylabel("Count")

random_id = str(uuid.uuid1())
graphId = random_id + '.jpg'
plt.savefig('public/graphs/type2/' + graphId)

webbrowser.open('http://localhost:8080/static/graphs/type2/' + graphId, new=2)