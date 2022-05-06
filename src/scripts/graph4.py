# In[13]:


var1 = True
var2 = "In store"




df4 = pd.DataFrame(list(collection.aggregate([{"$match":
{"couponUsed": var1,
"purchaseMethod" : var2}},
#{"$unwind" : "$items"},
{"$group":
{"_id" : {"$year":"$saleDate"},
"in store" : {"$sum":1}}},
{"$sort" : {"_id" : 1}}])))
df4.columns = df4.columns.str.replace('_id', 'year')



display(var2)
display(df4)



var2 = "Phone"



df5 = pd.DataFrame(list(collection.aggregate([{"$match":
{"couponUsed": var1,
"purchaseMethod" : var2}},
#{"$unwind" : "$items"},
{"$group":
{"_id" : {"$year":"$saleDate"},
"phone" : {"$sum":1}}},
{"$sort" : {"_id" : 1}}])))
df5.columns = df5.columns.str.replace('_id', 'year')



display(var2)
display(df5)


var2 = "Online"



df6 = pd.DataFrame(list(collection.aggregate([{"$match":
{"couponUsed": var1,
"purchaseMethod" : var2}},
#{"$unwind" : "$items"},
{"$group":
{"_id" : {"$year":"$saleDate"},
"online" : {"$sum":1}}},
{"$sort" : {"_id" : 1}}])))
df6.columns = df6.columns.str.replace('_id', 'year')



display(var2)
display(df6)


# In[14]:


result2 = pd.merge(df4, df5[["year", "phone"]], on="year", how="right")


# In[15]:


result3 = pd.merge(result2, df6[["year", "online"]], on="year", how="right")


# In[16]:


display(result3)
# In[1]:


import pymongo
import pandas as pd
from pymongo import MongoClient
import numpy as np
import matplotlib.pyplot as plt
import sys

myclient = MongoClient("mongodb://cfortier:cfortier123@cluster0-shard-00-00.gjdrt.mongodb.net:27017,cluster0-shard-00-01.gjdrt.mongodb.net:27017,cluster0-shard-00-02.gjdrt.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-e0cio3-shard-0&readPreference=primary&ssl=true")


# In[20]:


year = list(result3['year'])
line1 = list(result3['in store'])
line2 = list(result3['phone'])
line3 = list(result3['online'])

plt.title("Purchase method by customers \n that used a coupon", fontsize='x-large', fontweight="bold")
plt.xticks([2013, 2014, 2015, 2016, 2017],['2013','2014','2015','2016', '2017'])
plt.xlabel("Year")
plt.ylabel("Count")
plt.plot(year,line1, 'y')
plt.plot(year,line2, 'b')
plt.plot(year,line3, 'g')
fig = plt.figure()
fig.patch.set_facecolor('xkcd:mint green')
#plt.show()

plt.savefig('public/graphs/type444.jpg')
