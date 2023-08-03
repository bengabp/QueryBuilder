from db import db


def flatten_list(lst, limit=None):
    result = []
    seen_set = set()  # To keep track of elements already added
    for item in lst:
        if isinstance(item, list):
            if limit is not None and len(result) >= limit:
                break
            result.extend(flatten_list(item, limit))
        else:
            if item not in seen_set and item:
                result.append(item)
                seen_set.add(item)
                if limit is not None and len(result) >= limit:
                    break
    return result


def get_search_suggestions(query, keyword = None, limit=10):
    if limit > 30:
        limit = 30
        
    pipeline = []

    # Match stage: Construct the $match stage based on the query_parts and keyword
    if keyword is not None:
        match_stage = {query: {"$regex": f"^{keyword}", "$options": "imx"}}
        pipeline.append({"$match": match_stage})

    # Group stage: Construct the $group stage to reshape the results
    group_stage = {"_id": None, "suggestions": {"$addToSet": "$" + query}}
    pipeline.append({"$group": group_stage})

    # Execute the pipeline
    result = db.companies.aggregate(pipeline)
    
    # Extract and return the suggestions from the result
    completions = []
    
    try:
        comps = next(result)
        completions = flatten_list(comps["suggestions"], limit)
    except StopIteration:
        pass
    
    return completions
    

