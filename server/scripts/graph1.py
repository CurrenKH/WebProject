# In[1]:


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



df = pd.DataFrame(list(collection.aggregate([{ "$match": { "storeLocation": sys.argv[1] } },{"$group":{"_id" : "$couponUsed", "total" : {"$sum":1}}},{"$sort" : {"total" : -1}}])))



dfGrouped = df.groupby('_id').sum('total')

print(list(dfGrouped['total']))
      
print(list(dfGrouped.index))




plt.title("Coupon Usage in \n" + sys.argv[1] + " Stores", fontsize='x-large', fontweight="bold")

y = np.array(dfGrouped['total'])
mylabels = ["True", "False"]
plt.pie(y, labels = mylabels)
plt.legend()

#random_id = str(uuid.uuid1())
random_id = sys.argv[2]

graphId = random_id + '.jpg'
plt.savefig('public/graphs/type1/' + graphId)

webbrowser.open('http://localhost:8080/static/graphs/type1/' + graphId, new=2)