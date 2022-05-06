# In[1]:


import pymongo
import pandas as pd
from pymongo import MongoClient
import numpy as np
import matplotlib.pyplot as plt
import sys

myclient = MongoClient("mongodb://cfortier:cfortier123@cluster0-shard-00-00.gjdrt.mongodb.net:27017,cluster0-shard-00-01.gjdrt.mongodb.net:27017,cluster0-shard-00-02.gjdrt.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-e0cio3-shard-0&readPreference=primary&ssl=true")


# In[11]:


df3 = pd.DataFrame(list(collection.aggregate([{ "$match": { "storeLocation": "Denver" } },{"$unwind" : "$customer"},{"$group":{"_id" : "$customer.satisfaction", "total" : {"$sum": "$customer.satisfaction"}}},{"$sort" : {"_id" : 1}}])))
df3.columns = df3.columns.str.replace('_id', 'rating')
display(df3)


# In[ ]:


place = list(df3['rating'])
count = list(df3['total'])

plt.title("Count of satisfaction ratings \n in Denver stores", fontsize='x-large', fontweight="bold")
plt.bar(place,count, color='navy')
plt.xlabel("Rating")
plt.ylabel("Count")
#plt.show

plt.savefig('public/graphs/type333.jpg')