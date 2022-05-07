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


df3 = pd.DataFrame(list(collection.aggregate([{ "$match": { "storeLocation": sys.argv[1] } },{"$unwind" : "$customer"},{"$group":{"_id" : "$customer.satisfaction", "total" : {"$sum": "$customer.satisfaction"}}},{"$sort" : {"_id" : 1}}])))
df3.columns = df3.columns.str.replace('_id', 'rating')


place = list(df3['rating'])
count = list(df3['total'])

plt.title("Count of satisfaction ratings \n in " +  sys.argv[1] +  " stores", fontsize='x-large', fontweight="bold")
plt.bar(place,count, color='navy')
plt.xlabel("Rating")
plt.ylabel("Count")

random_id = str(uuid.uuid1())
graphId = random_id + '.jpg'
plt.savefig('public/graphs/type3/' + graphId)

webbrowser.open('http://localhost:8080/static/graphs/type3/' + graphId, new=2)