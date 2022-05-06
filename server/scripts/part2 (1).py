#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pymongo
import pandas as pd
from pymongo import MongoClient
import numpy as np
import matplotlib.pyplot as plt
import sys

myclient = MongoClient("mongodb://localhost:27017")


# In[2]:


mydb = myclient["sample_supplies"]

#select the collection within the database
collection = mydb.sales


# In[3]:


df = pd.DataFrame(list(collection.aggregate([{ "$match": { "storeLocation": sys.argv[1] } },{"$group":{"_id" : "$couponUsed", "total" : {"$sum":1}}},{"$sort" : {"total" : -1}}])))

display(df)


# In[4]:


dfGrouped = df.groupby('_id').sum('total')

print(list(dfGrouped['total']))
      
print(list(dfGrouped.index))


# In[25]:


plt.title("Coupon Usage in \n" + sys.argv[1] + " Stores", fontsize='x-large', fontweight="bold")

y = np.array(dfGrouped['total'])
mylabels = ["True", "False"]
plt.pie(y, labels = mylabels)
plt.legend()
#plt.show()

plt.savefig('public/graphs/type1233.jpg', edgecolor='red')


# In[9]:


df2 = pd.DataFrame(list(collection.aggregate([
    {  "$match": { "purchaseMethod": "Online" }
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
display(df2)


# In[ ]:


years = list(df2['year'])
count = list(df2['total'])

plt.title("Store sale frequency \n online by year", fontsize='x-large', fontweight="bold")
plt.plot(years,count)
plt.xticks([2013, 2014, 2015, 2016, 2017],['2013','2014','2015','2016', '2017'])
listOf_Yticks = np.arange(150, 450, 50)
plt.yticks(listOf_Yticks)
plt.xlabel("Year")
plt.ylabel("Count")
plt.show()


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
plt.show


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
plt.show()


# In[ ]:




