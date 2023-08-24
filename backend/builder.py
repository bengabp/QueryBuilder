from bson import Regex


def is_blank_stage(field, values):
    operator = "$nin"
    if len(values) > 0:
        if values[0] == "true":
            operator = "$in"
    return {
        "$match": {
            field: {
                operator: [[], None, "", {}],
            },
        },
    }


does_not_include_string_stage = lambda field, values: {
    "$match": {field: {"$not": {"$in": values}}}
}

contains_any_string_stage = lambda field, values: {"$match": {field: {"$in": values}}}

# def equals_boolean_stage(field, values):
# 	f = False

pipeline_builder = {
    "does_not_include_all": {
        "string_among": {
            "get_pipeline": lambda field, values: {
                "$match": {
                    field: {
                        "$not": {"$all": values},
                    },
                }
            }
        }
    },
    "includes_all": {
        "string_among": {
            "get_pipeline": lambda field, values: {
                "$match": {
                    field: {"$all": values},
                },
            }
        }
    },
    "does_not_equal": {
        # "string_among": {""},
        "number": {
            "get_pipeline": lambda field, values: {
                "$match": {
                    field: {
                        "$ne": values[0],
                    },
                },
            }
        },
        "boolean": {
            "get_pipeline": lambda field, values: {
                "$match": {
                    field: {"$ne": True if values[0] == "true" else False},
                },
            }
        },
    },
    "after": {
        "date": {
            "get_pipeline": lambda field, values: {
                "$match": {
                    field: {"$gt": values[0]},
                },
            },
        }
    },
    "does_not_contain": {
        "string_among": {
            "get_pipeline": lambda field, values: {
                "$match": {
                    field: {"$nin": values},
                },
            },
        }
    },
    "greater_than_or_equal_to": {
        "number": {
            "get_pipeline": lambda field, values: {
                "$match": {
                    field: {
                        "$gte": values[0],
                    },
                },
            }
        }
    },
    "less_than_or_equal_to": {
        "number": {
            "get_pipeline": lambda field, values: {
                "$match": {
                    field: {
                        "$lte": values[0],
                    },
                },
            }
        }
    },
    "between": {
        "number": {
            "get_pipeline": lambda field, values: {
                "$match": {
                    field: {
                        "$gte": values[0],
                        "$lte": values[1],
                    },
                }
            },
        },
        "date": {
            "get_pipeline": lambda field, values: {
                "$match": {
                    field: {
                        "$gte": values[0],
                        "$lte": values[1],
                    },
                }
            }
        },
    },
    "before": {
        "date": {
            "get_pipeline": {
                lambda field, values: {
                    "$match": {
                        field: {"$lt": values[0]},
                    },
                },
            },
        },
    },
    "equals": {
        "number": {
            "get_pipeline": lambda field, values: {"$match": {field: values[0]}}
        },
        "boolean": {
            "get_pipeline": lambda field, values: {
                "$match": {field: True if values[0] == "true" else False}
            }
        },
        "date": {
            "get_pipeline": lambda field, values: {
                "$match": {
                    field: {
                        "$eq": values[0],
                    },
                },
            }
        },
    },
    "contains_any": {
        "string_among": {"get_pipeline": contains_any_string_stage},
        "string_long": {"get_pipeline": contains_any_string_stage},
    },
    "is_blank": {
        "string_among": {"get_pipeline": is_blank_stage},
        "number": {"get_pipeline": is_blank_stage},
        "string_long": {"get_pipeline": is_blank_stage},
        "date": {"get_pipeline": is_blank_stage},
        "boolean": {"get_pipeline": is_blank_stage},
    },
    "does_not_include": {
        "string_among": {"get_pipeline": does_not_include_string_stage},
        "string_long": {"get_pipeline": does_not_include_string_stage},
    },
    "includes_any": {
        "string_among": {
            "get_pipeline": lambda field, values: {"$match": {field: {"$in": values}}}
        }
    },
    "starts_with": {
        "string_among": {
            "get_pipeline": lambda field, values: {
                "$match": {field: Regex(f"^{values[0]}", "i")}
            }
        }
    },
}
