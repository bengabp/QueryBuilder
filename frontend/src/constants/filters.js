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
        hq_details:["Basic Info", "Headquaters"],
        tech_stacks:["Basic Info", "Tech Stacks"],
        tech_stacks_company:["Basic Info", "Tech Stacks", "Companies"],
    employees:["Employees"],
    events:["Events"],
        participated_events:["Events","Participated Events"],
    founders:["Founders"],
    income_funding:["Income & Funding"],
        funding_details:["Income & Funding","Fundings"],
        funding_investor_details:["Income & Funding", "Fundings", "Investors"],

    investors:["Investor & Investments"],
        investor_details:["Investors & Investments", "Investors"],
        investment_details:["Investors & Investments", "Investments"],
    industries:["Industries"],
    ipo_round:["IPO Round"],
        ipo_round_investors:["IPO Round", "Investors"],
    kpi_summary:["Kpi Summary"],
        kpi_summary_values:["Kpi Summary", "Values"],
        kpi_summary_valuations:["Kpi Summary", "Valuations"],
    similar_companies:["Similar Companies"],
    revenues:["Revenues"],
    innovations:["Innovations"],
}

export const filters = {
    basic_info:[
        {dataKey:"name",text:"Company Name",dType:"string"},
        {dataKey:"crunchbase_url",text:"Crunchbase Url",dType:"string"},
        {dataKey:"create_date",text:"Create Date", dType:"date"},
        {dataKey:"company_status",text:"Company Status", dType:"string"},
        {dataKey:"facebook_url",text:"Facebook Url",dType:"string"},
        {dataKey:"launch_month",text:"Launch Month", dType:"number"},
        {dataKey:"launch_year", text:"Launch Year", dType:"number"},
        {dataKey:"linkedin_url",text:"Linkedin Url",dType:"string"},
        {dataKey:"tags",text:"Tags", dType:"string"},
        {dataKey:"tagline",text:"Tagline", dType:"string"},
        {dataKey:"technologies",text:"Technologies", dType:"string"},
        {dataKey:"total_jobs_available",text:"Total Jobs Available", dType:"number"},
        {dataKey:"type",text:"Type", dType:"string"},
        {dataKey:"tech_stacks",text:"Tech Stack", dType:"string", nextFilterKey:"tech_stacks"},
        {dataKey:"twitter_url",text:"Twitter Url", dType:"string"},
        {dataKey:"year_became_unicorn",text:"Year became Unicorn", dType:"number"},
        {dataKey:"year_became_future_unicorn",text:"Year became Future Unicorn", dType:"number"},
        {dataKey:"job_roles",text:"Job Roles", dType:"string"},
        {dataKey:"hq_locations",text:"Headquaters", dType:"string", nextFilterKey:"hq_details"},
        {dataKey:"startup_ranking_rating",text:"Startup Ranking Rating",dType:"number"},
        {dataKey:"growth_stage",text:"Growth Stage",dType:"string"},
        {dataKey:"is_ai_data",text:"Is AI Data",dType:"boolean"},
        {dataKey:"is_editorial",text:"Is Editorial", dType:"boolean"},
        {dataKey:"is_from_traderegister",text:"Is From Traderegister", dType:"boolean"},
        {dataKey:"matching_score",text:"Matching Score",dType:"string"},
        {dataKey:"sdgs",text:"Sdgs", dType:"string"},
        {dataKey:"patents_count",text:"Total Patents", dType:"number"}
    ],
    hq_details:[
        {dataKey:"address", text:"Address", dType:"location"},
        {dataKey:"country", text:"Country", dType:"string"},
        {dataKey:"continent", text:"Continent", dType:"string"},
        {dataKey:"city",text:"City", dType:"string"},
        {dataKey:"is_headquaters", dType:"boolean", text:"Is Headquaters"},
        {dataKey:"is_founding_location", dType:"boolean", text:"Is Founding Location"},
        {dataKey:"state", dType:"string", text:"State"}
    ],
    tech_stacks:[
        {datKey:"company", text:"Company", dType:"string", nextFilterKey:"tech_stacks_company"},
        {dataKey:"categories", text:"Categories", dType:"string"}
    ],
    tech_stacks_company:[
        {dataKey:"name", text:"Name", dType:"string"},
        {dataKey:"path", text:"Path", dType:"string"},
        {dataKey:"type", text:"Type", dType:"string"}
    ],
    employees:[
        {dType:"string",text:"Employee Range",dataKey:"employees"},// min-max
        {dType:"number",text:"Current number of Employees", dataKey:"employees_latest"},
        {dataKey:"employee_12_months_growth_percentile",dType:"string",text:"12 Months Growth Percentile"},
        {dataKey:"employee_12_months_growth_delta",dType:"number",text:"12 Months Growth Delta"},
        {dataKey:"employee_12_months_growth_unique",dType:"number",text:"12 Months Unique Growth"},
        {dataKey:"employee_12_months_growth_relative",dType:"number",text:"12 Months Relative Growth"},
        {dataKey:"employee_3_months_growth_delta",dType:"number",text:"3 Months Growth Delta"},
        {dataKey:"employee_3_months_growth_percentile",dType:"number",text:"3 Months Growth Percentile"},
        {dataKey:"employee_3_months_growth_relative",dType:"number",text:"3 Months Relative Growth"},
        {dataKey:"employee_3_months_growth_unique",dType:"number",text:"3 Months Unique Growth"},
        {dataKey:"employee_6_months_growth_delta",dType:"number",text:"6 Months Growth Delta"},
        {dataKey:"employee_6_months_growth_percentile",dType:"string",text:"6 Months Growth Percentile"},
        {dataKey:"employee_6_months_growth_relative",dType:"number",text:"6 Months Relative Growth"},
        {dataKey:"employee_6_months_growth_unique",dType:"number",text:"6 Months Unique Growth"}
    ],
    events:[
        {text:"Participated Events", nextFilterKey:"participated_events", dataKey:"participated_events"},
        {text:"Total", dType:"number", dataKey:"total"}

    ],
    participated_events:[
        {dataKey:"name", dType:"string",text:"Name"},
        {dataKey:"type", dType:"string",text:"Type"},
        {dataKey:"path", dType:"string",text:"Path"},
        {dataKey:"twitter_url", dType:"string",text:"Twitter Url"},
        {dataKey:"event_date_start", dType:"date",text:"Start Date"},
        {dataKey:"event_date_end", dType:"date",text:"End Date"},
        {dataKey:"angellist_url", dType:"string",text:"Angellist Url"},
        {dataKey:"linkedin_url", dType:"string",text:"Linkedin Url"}
    ],
    founders:[
        {dataKey:"founders_score_cumulated",text:"Cumulated Founders Score", dType:"number"},
        {dataKey:"name",text:"Founders", dType:"string"},
        {dataKey:"founders_top_university",text:"Founders Top University", dType:"string"},
        {dataKey:"founders_top_past_companies",text:"Founders Top Past Companies", dType:"string"},
        {dataKey:"has_strong_founder",text:"Has Strong Founder", dType:"boolean"},
        {dataKey:"has_super_founder",text:"Has Super Founder", dType:"boolean"},
        {dataKey:"has_promising_founder",text:"Has promising Founder", dType:"boolean"},
        {dataKey:"past_founders",dType:"number",text:"Number of Past Founders"},
        {dataKey:"past_founders_raised_10m",text:"Past Founders Raised 10m", dType:"number"}
    ],
    income_funding:[
        {dataKey:"fundings",dType:"string",text:"Fundings", nextFilterKey:"funding_details"},
        {dataKey:"total_funding_enhanced",dType:"number",text:"Total Funding Enhanced (USD)", },
        {dataKey:"income_streams",dType:"string",text:"Income Streams"}
    ],
    funding_details:[
        {dataKey:"total", text:"Number of Fundings", dType:"number"},
        {dataKey:"date",text:"Date", dType:"date"},
        {dataKey:"amount",text:"Amount", dType:"number"},
        {dataKey:"round",text:"Funding Round", dType:"string"},
        {dataKey:"unknown_investors",text:"Unknown Investors",dType:"string"},
        {dataKey:"valuation_generated_max",text:"Max Valuation Generated", dType:"number"},
        {dataKey:"valuation_generated_min",text:"Min Valuation Generated", dType:"number"},
        {dataKey:"valuation",text:"Valuation", dType:"string"},
        {dataKey:"is_undisclosed",text:"Is Undisclosed", dType:"boolean"},
        {dataKey:"investors", dType:"string", text:"Investors", nextFilterKey:"funding_investor_details"}
    ],
    funding_investor_details:[
        {dataKey:"type", dType:"string", text:"Type"},
        {dataKey:"name", dType:"string", text:"Name"},
        {dataKey:"path", dType:"string", text:"Path"},
        {dataKey:"lead", dType:"boolean", text:"Lead"}
    ],
    investors:[
        {text:"Investors", nextFilterKey:"investor_details", dataKey:"investors"},
        {text:"Total Investors", dType:"number", dataKey:"total_investors"},
        {text:"Investments", nextFilterKey:"investment_details", dataKey:"investments"}
    ],
    investor_details:[
        {dataKey:"type", dType:"string",text:"Type"},
        {dataKey:"name", dType:"string",text:"Name"},
        {dataKey:"path", dType:"string",text:"Path"},
        {dataKey:"lead", dType:"boolean",text:"Is Lead"},
        {dataKey:"exited", dType:"boolean",text:"Exited"}
    ],
    investment_details:[
        {dataKey:"type", dType:"string",text:"Type"},
        {dataKey:"name", dType:"string",text:"Name"},
        {dataKey:"path", dType:"string",text:"Path"},
        {dataKey:"lead", dType:"boolean",text:"Is Lead"},
        {dataKey:"exited", dType:"boolean",text:"Exited"}
    ],
    industries:[
        {dType:"string",dataKey:"industries",text:"Industries"},
        {dType:"string",dataKey:"sub_industries",text:"Sub Industries"},
        {dType:"string",dataKey:"service_industries",text:"Service Industries"}
    ],
    ipo_round:[
        {dataKey:"date",dType:"date",text:"Date"},
        {dataKey:"amount",dType:"number",text:"Amount (USD)"},
        {dataKey:"round",dType:"string",text:"Round"},
        {dataKey:"investors",dType:"date",text:"Investors", nextFilterKey:"ipo_round_investors"},
        {dataKey:"unknown_investors",dType:"date",text:"Unknown Investors"},
        {dataKey:"is_undisclosed",dType:"date",text:"Is Undisclosed"},
        {dataKey:"number",dType:"date",text:"Valuation"},
        {dataKey:"number",dType:"date",text:"Min Valuation Generated"},
        {dataKey:"number",dType:"date",text:"Max Valuation Generated"}
    ],
    ipo_round_investors:[
        {dataKey:"name", dType:"string", text:"Name"},
        {dataKey:"path", dType:"string", text:"Path"},
        {dataKey:"type", dType:"string",text:"Type"},
        {dataKey:"lead", dType:"boolean",text:"Is Lead"}
    ],
    kpi_summary:[
        {dType:"date",dataKey:"last_update_date",text:"Last Updated"},
        {dType:"boolean",dataKey:"revenues_hidden",text:"Revenues Hidden"},
        {dType:"boole an",dataKey:"ebitda_hidden",text:"Ebida Hidden"},
        {dType:"boolean",dataKey:"rnd_hidden", text:"Rnd Hidden"},
        {dType:"boolean",dataKey:"market_cap_hidden",text:"Market Cap Hidden"},
        {dType:"boolean",dataKey:"valuation_hidden",text:"Valuation Hidden"},
        {dataKey:"profit_hidden",text:"Profit Hidden", dType:"boolean"},
        {dataKey:"last_updated",text:"Values", nextFilterKey:"kpi_summary_values"},
        {dataKey:"valuations", text:"Valuations", nextFilterKey:"kpi_summary_valuations", dType:"string"}
    ],

    kpi_summary_values:[
        {dType:"string",dataKey:"year",text:"Year",},
        {dType:"number",dataKey:"valuation",text:"Valuation"},
        {dType:"number",dataKey:"revenue",text:"Revenue"},
        {dType:"string",dataKey:"revenue_growth",text:"Revenue Growth"},
        {dType:"number",dataKey:"revenue_source",text:"Revenue Source"},
        {dType:"number",dataKey:"ebitda",text:"Ebitda"},
        {dType:"number",dataKey:"ebitda_margin",text:"Ebitda Margin"},
        {dType:"number",dataKey:"ebitda_source",text:"Ebitda Source"},
        {dType:"number",dataKey:"profit",text:"Profit"},
        {dType:"number",dataKey:"profit_source",text:"Profit Source"},
        {dType:"number",dataKey:"profit_margin",text:"Profit Margin"},
        {dType:"number",dataKey:"rnd",text:"Rnd"},
        {dType:"number",dataKey:"rnd_margin",text:"Rnd Margin"},
        {dType:"number",dataKey:"rnd_source",text:"Rnd Source"},
        {dType:"number",dataKey:"rnd_revenue",text:"Rnd Revenue"},
        {dType:"number",dataKey:"rnd_ebitda",text:"Rnd Ebitda"},
        {dType:"number",dataKey:"ev_revenue",text:"Ev Revenue"},
        {dType:"number",dataKey:"ev_ebitda",text:"Ev Ebitda"},
    ],
    kpi_summary_valuations:[
        {text:"Date", dType:"date", dataKey:"date"},
        {text:"Source", dType:"string", dataKey:"source"},
        {text:"Source Round", dType:"string", dataKey:"source_round"},
        {text:"Valuation",dType:"number", dataKey:"valuation"},
        {text:"Min Valuation", dType:"number", dataKey:"valuation_min"},
        {text:"Max Valuation", dType:"number", dataKey:"valuation_max"},
        {text:"Market Cap", dType:"number", dataKey:"market_cap"},
        {text:"Net Debt", dType:"number", dataKey:"net_debt"}
    ],
    similar_companies:[
        {dType:"number",dataKey:"similarweb_12_months_growth_delta",text:"12 Months Growth delta",},
        {dType:"string",dataKey:"similarweb_12_months_growth_percentile",text:"12 Months Growth percentile",},
        {dType:"number",dataKey:"similarweb_12_months_growth_relative",text:"12 Months Growth relative",},
        {dType:"number",dataKey:"similarweb_12_months_growth_unique",text:"12 Months Growth unique",},
        {dType:"number",dataKey:"similarweb_3_months_growth_delta",text:"3 Months Growth Delta",},
        {dType:"string",dataKey:"similarweb_3_months_growth_percentile",text:"3 Months Growth Percentile",},
        {dType:"number",dataKey:"similarweb_3_months_growth_relative",text:"3 Months Relative Growth",},
        {dType:"number",dataKey:"similarweb_3_months_growth_unique",text:"3 Months Unique Growth",},
        {dType:"number",dataKey:"similarweb_6_months_growth_delta",text:"6 Months Growth Delta",},
        {dType:"string",dataKey:"similarweb_6_months_growth_percentile",text:"6 Months Growth Percentile",},
        {dType:"number",dataKey:"similarweb_6_months_growth_relative",text:"6 Months Relative Growth",},
        {dType:"number",dataKey:"similarweb_6_months_growth_unique",text:"6 Months Unique Growth"}
    ],

    revenues:[
        {dType:"string",dataKey:"revenues",text:"Revenues"},
        {dType:"number",dataKey:"latest_revenue_enhanced",text:"Latest Revenue Enhanced (USD)"}
    ],
    
   innovations:[
        {dType:"string",dataKey:"innovations",text:"Innovations"},
        {dType:"number",dataKey:"innovations_count",text:"Total Innovations"},
        {dType:"number",dataKey:"innovations_corporate_rank",text:"Innovation Corporate Rank"}
    ]
}

