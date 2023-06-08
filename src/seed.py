import os
import pymongo

from pathlib import Path

def parse_mdx_data(mdx_data):
    # Parse the MDX data and extract the required fields
    mdx_data_object = {}
    front_matter = mdx_data.split('---')[1].strip()
    for line in front_matter.split('\n'):
        key, value = map(str.strip, line.split(':'))
        # Remove extra quotation marks from the value
        value = value.strip('"')
        mdx_data_object[key] = value

    # Extract the required fields
    title = mdx_data_object.get('title')
    slug = mdx_data_object.get('slug')
    startDate = mdx_data_object.get('startDate')
    endDate = mdx_data_object.get('endDate')
    scholarshipType = mdx_data_object.get('scholarshipType')
    isFemaleOnly = mdx_data_object.get('isFemaleOnly')
    category = mdx_data_object.get('category')
    religion = mdx_data_object.get('religion')
    minimumFamilyIncome = mdx_data_object.get('minimumFamilyIncome')
    marksRequired = mdx_data_object.get('marksRequired')
    doStudentNeedToTakeExam = mdx_data_object.get('doStudentNeedToTakeExam')
    isStartDateExact = mdx_data_object.get('isStartDateExact')
    isEndDateExact = mdx_data_object.get('isEndDateExact')
    state = mdx_data_object.get('state')
    level_of_study = mdx_data_object.get('level_of_study')
    feild_of_study = mdx_data_object.get('feild_of_study')
    tags = mdx_data_object.get('tag', '').split(',')
    tags = [tag.strip() for tag in tags]

    # Handle isFemaleOnly and set gender accordingly
    if isFemaleOnly == 'Yes':
        gender = 'Female'
    else:
        gender = 'All'

    # Extract the description
    description = mdx_data.split('# How to Apply?')[0].strip()

    # Convert level_of_study and feild_of_study to arrays if they are not already
    if level_of_study is not None and not isinstance(level_of_study, list):
        level_of_study = [level_of_study]
    if feild_of_study is not None and not isinstance(feild_of_study, list):
        feild_of_study = [feild_of_study]

    return {
        'title': title,
        'slug': slug,
        'startDate': startDate,
        'endDate': endDate,
        'scholarshipType': scholarshipType,
        'isFemaleOnly': isFemaleOnly,
        'category': category,
        'religion': religion,
        'minimumFamilyIncome': minimumFamilyIncome,
        'marksRequired': marksRequired,
        'doStudentNeedToTakeExam': doStudentNeedToTakeExam,
        'isStartDateExact': isStartDateExact,
        'isEndDateExact': isEndDateExact,
        'gender': gender,
        'state': state,
        'level_of_study': level_of_study,
        'feild_of_study': feild_of_study,
        'tags': tags,
        'description': description
    }

def seed_data():
    # Get the absolute path of the mdx-file directory
    mdx_file_dir = os.path.abspath('./mdx-file')

    # Connect to MongoDB
    mongo_uri = 'mongodb+srv://shubham:123@cluster0.x8dbuw7.mongodb.net/margdarshan'
    client = pymongo.MongoClient(mongo_uri)
    db = client.margdarshan

    # Loop through all the MDX files in the directory
    for filename in os.listdir(mdx_file_dir):
        if filename.endswith('.mdx'):
            mdx_file_path = os.path.join(mdx_file_dir, filename)
            
            try:
                # Read the MDX file
                with open(mdx_file_path, 'r') as file:
                    mdx_data = file.read()

                # Extract the required data from the MDX file
                data = parse_mdx_data(mdx_data)

                # Create a new Scholarship document
                scholarship = {
                    'title': data['title'],
                    'slug': data['slug'],
                    'startDate': data['startDate'],
                    'endDate': data['endDate'],
                    'scholarshipType': data['scholarshipType'],
                    'isFemaleOnly': data['isFemaleOnly'],
                    'category': data['category'],
                    'religion': data['religion'],
                    'minimumFamilyIncome': data['minimumFamilyIncome'],
                    'marksRequired': data['marksRequired'],
                    'doStudentNeedToTakeExam': data['doStudentNeedToTakeExam'],
                    'isStartDateExact': data['isStartDateExact'],
                    'isEndDateExact': data['isEndDateExact'],
                    'gender': data['gender'],
                    'state': data['state'],
                    'level_of_study': data['level_of_study'],
                    'feild_of_study': data['feild_of_study'],
                    'tags': data['tags'],
                    'description': data['description']
                }

                # Insert the Scholarship document to the database
                db.scholarships.insert_one(scholarship)

                print(f'Data seeded successfully from file: {mdx_file_path}')
            except Exception as e:
                print(f'Error seeding data from file: {mdx_file_path}', str(e))

    # Close the MongoDB connection
    client.close()

if __name__ == '__main__':
    seed_data()
