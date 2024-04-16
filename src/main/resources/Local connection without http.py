import sys

print("Python 版本:", sys.version)
import os
import sys
import json
import traceback
import datetime
import joblib
import pandas as pd
import warnings
from pymongo import MongoClient

current_date = datetime.datetime.now()  # 将日期字段改为 datetime.datetime 类型

def main(file_path):
    try:
        
        # 使用命令行参数获取JSON文件路径，我们假设它是第二个参数传入
        json_file_path = sys.argv[2]

        # 确保以文本模式和正确的编码读取文件
        with open(json_file_path, 'r', encoding='utf-8') as file:
            enquiry_json = file.read()
        enquiry = json.loads(enquiry_json)
        data_df = pd.DataFrame([enquiry])

        # ... 使用JSON数据进行操作 ...

        # 接下来获取模型路径，我们假设模型路径是第一个参数传入
        model_path = sys.argv[1]

        # 确保以二进制模式读取joblib文件
        model = joblib.load(model_path)
        
        """ # Read the file and parse JSON
        with open(file_path, 'r', encoding='utf-8') as file:
            enquiry_json = file.read()
        enquiry = json.loads(enquiry_json)

        # Create DataFrame from dictionary
        data_df = pd.DataFrame([enquiry]) """

        rename_mapping = {
        'text': 'Text',
        'contactMethod': 'Contact Method',
        'customerIdentity': 'Customer Identity',
        'customerAge': 'Customer Age',
        'areaOfResidence': 'Area of Residence',
        'incomeLevel': 'Income Level',
        'expenditureSituation': 'Expenditure Situation',
        'employmentStatus': 'Employment Status',
        'propertyOwnershipStatus': 'Property Ownership Status',
        'investmentIntent':'Investment Intent',
        'previousTransactionExperience': 'Previous Transaction Experience',
        'familySituation': 'Family Situation',
        'financialReadiness': 'Financial Readiness',
        'preferredCommunicationMethod': 'Preferred Communication Method',
        'decisionTimeframe': 'Decision Timeframe',
        'creditScoreRange': 'Credit Score Range',
        'inquiryLength': 'Inquiry Length',
        'urgencyIndicator': 'Urgency Indicator',
        'sentimentScore': 'Sentiment Score',
        'keywordsPresence': 'Keywords Presence',
        'dayOfTheWeek': 'Day of the Week',
        'timeOfDay': 'Time of Day',
        'geographicalIndicator': 'Geographical Indicator',
        'previousInteractions': 'Previous Interactions',
        'inquirySource': 'Inquiry Source',
        'propertyTypeInterest': 'Property Type Interest',
        'budgetMentioned': 'Budget Mentioned',
        'transactionOutcome': 'Transaction Outcome',
        'name': 'Name',
        'phoneNumber': 'Phone Number',
        'status': 'Status',
        'date': 'Date'
    }

        # 现在使用rename()方法来重命名列
        data_df.rename(columns=rename_mapping, inplace=True)
        #data_df.rename(columns={'old_name': 'new_name'}, inplace=True)
        model_path = sys.argv[1]
        model = joblib.load(model_path)
        """ current_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(current_dir, 'model_Version1.joblib')
        model = joblib.load(model_path) """


        #去除非预测的因子
        new_data_df = data_df.drop(['Text', 'Contact Method', 'Area of Residence','Employment Status','Family Situation','Financial Readiness','Preferred Communication Method','Keywords Presence','Geographical Indicator','Inquiry Source','Property Type Interest','Budget Mentioned','Property Ownership Status',
        'Investment Intent','Name','Phone Number','Date','Status'], axis=1)
        correct_feature_order = [
        'Customer Identity', 'Customer Age','Income Level', 'Expenditure Situation',
        'Previous Transaction Experience', 'Decision Timeframe',
        'Credit Score Range', 'Inquiry Length' ,'Urgency Indicator',
        'Sentiment Score' ,'Day of the Week' ,'Time of Day' ,'Previous Interactions'
        ]

            # 重新排序DataFrame的列，并确保所有列名都是正确的
        new_data_df = new_data_df[correct_feature_order]

            # 重新命名列以确保它们的大小写和空格与训练时使用的一致
        new_data_df.columns = correct_feature_order

            # Normalization
        new_data_df['Customer Identity'] = new_data_df['Customer Identity'].replace({'Buyer': 1, 'Seller': 2})
        new_data_df['Income Level'] = new_data_df['Income Level'].replace({'N/A': 0,'Low': 1, 'Medium': 2,'High': 3,'Very High': 4,})
        new_data_df['Expenditure Situation'] = new_data_df['Expenditure Situation'].replace({'N/A': 0,'Low': 1, 'Moderate': 2,'High': 3})
        new_data_df['Previous Transaction Experience'] = new_data_df['Previous Transaction Experience'].replace({'Yes': 1, 'No': 0})
        new_data_df['Decision Timeframe'] = new_data_df['Decision Timeframe'].replace({'<1 month': 1, '<3 months': 3,'<6 months': 5,'>12 months': 3,'1-3 months': 2,'3-6 months': 4,'6+ months': 6,'6-12 months': 7})
        new_data_df['Credit Score Range'] = new_data_df['Credit Score Range'].replace({'650-700': 1, '670-720': 2,'680-730': 3, '690-740': 4,'700-750': 5,'710-760': 6,'720-760':7,'730-760': 8,'720-770': 9,'730-780': 10,'720-780': 11,'740-790':12,'750-800': 13,'760-800': 14,'760-810':15,'770-820':16,'780-830':17,'790-840': 18})
        new_data_df['Urgency Indicator'] = new_data_df['Urgency Indicator'].replace({'No rush': 1, 'Medium': 2,'Soon': 3,'Immediate': 4,'Urgent': 5})
        new_data_df['Day of the Week'] = new_data_df['Day of the Week'].replace({'Monday': 1,
            'Tuesday': 2,
            'Wednesday': 3,
            'Thursday': 4,
            'Friday': 5,
            'Saturday': 6,
            'Sunday': 7})
        new_data_df['Time of Day'] = new_data_df['Time of Day'].replace({'Morning': 1,
            'Afternoon': 2,
            'Evening': 3})
        #new_data_df['Transaction Outcome'] = new_data_df['Transaction Outcome'].replace({'Pending': 1, 'Bad': 0,'Good': 2})
            #correct_feature_order.sample(3)
            #print(model.feature_names_in_)  # 打印模型训练时的特征名称
        predictions = model.predict(new_data_df)
        data_df['Transaction Outcome'] = predictions
        data_df['Transaction Outcome'] = data_df['Transaction Outcome'].replace({0: "Bad", 1: "Pending",2: "Good"})
        data_df['Date'] = current_date

        # connect to the MongoDB
        client = MongoClient('mongodb+srv://model:Model123456@customers.qfciub1.mongodb.net/')
        db = client['Info']
        collection = db['Enquiry']
        data_dict = data_df.to_dict(orient='records')
        collection = collection.insert_one(data_dict[0])
        
        result_json = data_df.to_json(orient='records')
        print(result_json)
        warnings.filterwarnings('ignore', category=FutureWarning)


        

        return result_json
        
    
    except Exception as e:
        print("Error:", str(e))
        traceback.print_exc()
        warnings.filterwarnings('ignore', category=FutureWarning)
        return json.dumps({"error": str(e)})


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main(sys.argv[1])
    else:
        print("No file path provided.")
        sys.exit(1)  # 如果没有提供文件路径，结束程序