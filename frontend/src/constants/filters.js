export const parentFilters = [
    "basic_info",
    "employees",
    "events",
    "founders",
    "income_funding",
    "investors",
    "industries",
    "innovations",
    "ipo_round",
    "kpi_summary",
    "similar_companies",
    "revenues"
]

export const filterKeyIndices = {
    basic_info: ["Basic Info"],
    employees:["Employees"],
    events:["Events"],
        participated_events:["Events","Participated Events"],
    founders:["Founders"],
    income_funding:["Income & Funding"],
        funding_details:["Income & Funding","Fundings"],
    investors:["Investor & Investments"],
        investor_details:["Investors & Investments", "Investors"],
        investment_details:["Investors & Investments", "Investments"],
    industries:["Industries"],
    ipo_round:["IPO Round"],
    kpi_summary:["Kpi Summary"],
        kpi_summary_values:["Kpi Summary", "Values"],
    similar_companies:["Similar Companies"],
    revenues:["Revenues"],
    innovations:["Innovations"],
    innovation_details:["Innovations","Innovations"]
}

export const filters = {
    innovation_details:[
        {text:"Name"},
        {text:"Year"},
        {text:"Month"}
    ],
    basic_info:[
        {text:"Company Name"},
        {text:"Crunchbase Url",},
        {text:"Create Date",},
        {text:"Company Status",},
        {text:"Facebook Url",},
        {text:"Launch Month",},
        {text:"Launch Year",},
        {text:"Linkedin Url",},
        {text:"Tags",},
        {text:"Tagline",},
        {text:"Technologies",},
        {text:"Total Jobs Available",},
        {text:"Type",},
        {text:"Tech Stack",},
        {text:"Twitter Url",},
        {text:"Year became Unicorn",},
        {text:"Year became Future Unicorn",},
        {text:"Job Roles",},
        {text:"HQ Locations",},
        {text:"Startup Ranking Rating",},
        {text:"Growth Stage",},
        {text:"Is AI Data",},
        {text:"Is Editorial",},
        {text:"Is From Traderegister",},
        {text:"Matching Score",},
        {text:"Sdgs", },
        {text:"Total Patents"}
    ],
    employees:[
        {text:"Employee Range"},// min-max
        {text:"Current number of Employees"},
        {text:"12 Months Growth Percentile"},
        {text:"12 Months Growth Delta"},
        {text:"12 Months Unique Growth"},
        {text:"12 Months Relative Growth"},
        {text:"3 Months Growth Delta"},
        {text:"3 Months Growth Percentile"},
        {text:"3 Months Relative Growth"},
        {text:"3 Months Unique Growth"},
        {text:"6 Months Growth Delta"},
        {text:"6 Months Growth Percentile"},
        {text:"6 Months Relative Growth"},
        {text:"6 Months Unique Growth"}
    ],
    events:[
        {text:"Participated Events", nextFilterKey:"participated_events"},
        {text:"Total"}

    ],
    participated_events:[
        {text:"Name"},
        {text:"Type"},
        {text:"Path"},
        {text:"Twitter Url"},
        {text:"Start Date"},
        {text:"End Date"},
        {text:"Angellist Url"},
        {text:"Linkedin Url"}
    ],
    founders:[
        {text:"Cumulated Founders Score"},
        {text:"Founders"},
        {text:"Founders Top University"},
        {text:"Founders Top Past Companies"},
        {text:"Has Strong Founder"},
        {text:"Has Super Founder"},
        {text:"Has promising Founder"},
        {text:"Past Founders"},
        {text:"Past Founders Raised 10m"}
    ],
    income_funding:[
        {text:"Fundings", nextFilterKey:"funding_details"},
        {text:"Total Funding Enhanced (USD)"},
        {text:"Income Streams"}
    ],
    funding_details:[
        {text:"Year"},
        {text:"Month"},
        {text:"Amount"},
        {text:"Funding Round"},
        {text:"Funding Investors"},
        {text:"Funding Investor Type"},
        {text:"Funding Investor is Lead"},
        {text:"Funding Investor Path"},
        {text:"Unknown Investors"},
        {text:"Max Valuation Generated"},
        {text:"Min Valuation Generated"},
        {text:"Valuation"},
        {text:"Is Undisclosed"}
    ],
    investors:[
        {text:"Investors", nextFilterKey:"investor_details"},
        {text:"Total Investors"},
        {text:"Investments", nextFilterKey:"investment_details"}
    ],
    investor_details:[
        {text:"Type"},
        {text:"Name"},
        {text:"Path"},
        {text:"Is Lead"},
        {text:"Exited"}
    ],
    investment_details:[
        {text:"Type"},
        {text:"Name"},
        {text:"Path"},
        {text:"Is Lead"},
        {text:"Exited"}
    ],
    industries:[
        {text:"Industries"},
        {text:"Sub Industries"},
        {text:"Service Industries"}
    ],
    ipo_round:[
        {text:"Year"},
        {text:"Month"},
        {text:"Amount (USD)"},
        {text:"Round"},
        {text:"Investors"},
        {text:"Unknown Investors"},
        {text:"Is Undisclosed"},
        {text:"News Source"},
        {text:"Valuation"},
        {text:"Min Valuation Generated"},
        {text:"Max Valuation Generated"}
    ],
    kpi_summary:[
        {text:"Last Updated"},
        {text:"Revenues Hidden"},
        {text:"Ebida Hidden"},
        {text:"Market Cap Hidden"},
        {text:"Valuation Hidden"},
        {text:"Profit Hidden"},
        {text:"Values", nextFilterKey:"kpi_summary_values"}
    ],
    kpi_summary_values:[
        {text:"Year"},
        {text:"Valuation"},
        {text:"Revenue"},
        {text:"Revenue Growth"},
        {text:"Revenue Source"},
        {text:"Ebida"},
        {text:"Ebida Margin"},
        {text:"Ebida Source"},
        {text:"Profit"},
        {text:"Profit Source"},
        {text:"Profit Margin"},
        {text:"Rnd"},
        {text:"Rnd Margin"},
        {text:"Rnd Source"},
        {text:"Rnd Revenue"},
        {text:"Rnd Ebida"}
    ],
    similar_companies:[
        {text:"12 Months Growth delta",},
        {text:"12 Months Growth percentile",},
        {text:"12 Months Growth relative",},
        {text:"12 Months Growth unique",},
        {text:"3 Months Growth Delta",},
        {text:"3 Months Growth Percentile",},
        {text:"3 Months Relative Growth",},
        {text:"3 Months Unique Growth",},
        {text:"6 Months Growth Delta",},
        {text:"6 Months Growth Percentile",},
        {text:"6 Months Relative Growth",},
        {text:"6 Months Unique Growth"}
    ],

    revenues:[
        {text:"Revenues"},
        {text:"Latest Revenue Enhanced (USD)"}
    ],
    
   innovations:[
        {text:"Innovations", nextFilterKey:"innovation_details"},
        {text:"Total Innovations"},
        {text:"Innovation Corporate Rank"}
    ]
}

