import requests
import json

def get_nft_collection_info(collection_address):
    query = """
    query NftCollection($address: String!, $first: Int!, $after: String) {
        nftCollectionByAddress(address: $address) {
            name
            address
            description
        }
        nftCollectionItems(address: $address, first: $first, after: $after) {
            items {
                name
                address
                index
                attributes {
                    traitType
                    value
                }
            }
            cursor
        }
    }
    """

    variables = {
        "address": collection_address,
        "first": 100,
        "after": None
    }

    url = 'https://api.getgems.io/graphql'
    all_items = []

    while True:
        response = requests.post(url, json={'query': query, 'variables': variables})
        if response.status_code != 200:
            print("An error occurred while executing the request. Error code:", response.status_code)
            return None

        data = response.json()
        if 'errors' in data:
            print("An error has occurred:")
            print(data['errors'])
            return None

        nft_items = data['data']['nftCollectionItems']['items']
        all_items.extend(nft_items)

        cursor = data['data']['nftCollectionItems']['cursor']
        if cursor is None:
            break

        variables['after'] = cursor

    all_items.sort(key=lambda x: x['index'])

    return {
        'nftCollectionByAddress': data['data']['nftCollectionByAddress'],
        'nftCollectionItems': {'items': all_items}
    }

def generate_json(collection_info, collection_name):
    json_data = {}
    nft_collection = collection_info.get('nftCollectionByAddress')
    if nft_collection:
        json_data['name'] = nft_collection['name']
        json_data['address'] = nft_collection['address']
        json_data['description'] = nft_collection['description']

    items = collection_info.get('nftCollectionItems', {}).get('items', [])
    for item in items:
        item_data = {
            "Name": item['name'],
            "NFT Address": item['address'],
            "index": item['index'],
            "Attributes": [{"trait_type": attr['traitType'], "value": attr['value']} for attr in item.get('attributes', [])]
        }
        json_data[item['name']] = item_data

    filename = f"{collection_name}.json"

    with open(filename, "w", encoding="UTF-8") as file:
        json.dump(json_data, file, indent=4, ensure_ascii=False)


collection_address = "EQATbIOeT9ziq7Jf76dJlnWIAiZggY2TeDteAh46D4QICBZj"
collection_info = get_nft_collection_info(collection_address)
collection_name = collection_info.get('nftCollectionByAddress').get('name').replace(" ", "-") 

if collection_info:
    generate_json(collection_info, collection_name)
