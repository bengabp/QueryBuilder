import React from 'react';
import * as Material from '@mui/material';

import FiltersDialog from './FiltersDialog';
import AddFilterButton from './AddFilterButton';


export default function QueryBuilder(props) {
  const filters = {
    "Basic Info":[
        "name",
        "crunchbase_url",
        "create_date",
        "company_status",
        "facebook_url",
        "launch_month",
        "launch_year",
        "linkedin_url",
        "tags",
        "tagline",
        "technologies",
        "total_jobs_available",
        "type",
        "tech_stack",
        "twitter_url",
        "year_became_unicorn",
        "year_became_future_unicorn",
        "job_roles",
        "hq_locations",
        "startup_ranking_rating",
        "growth_stage",
        "is_ai_data",
        "is_editorial",
        "is_from_traderegister",
        "matching_score"            
    ],
    "Employees":[
        "employees",
        "employees_latest",
        "employees_chart",
        "employee_12_months_growth_delta",
        "employee_12_months_growth_percentile",
        "employee_12_months_growth_relative",
        "employee_12_months_growth_unique",
        "employee_3_months_growth_delta",
        "employee_3_months_growth_percentile",
        "employee_3_months_growth_relative",
        "employee_3_months_growth_unique",
        "employee_6_months_growth_delta",
        "employee_6_months_growth_percentile",
        "employee_6_months_growth_relative",
        "employee_6_months_growth_unique"
    ],
    "Investor & Investments":[
        "investors",
        "investments"
    ],
    "Industries":[
        "indstries",
        "sub_industries",
        "service_industries"
    ],
    "Income & Funding":{
        "fundings":[],
        "total_funding_enhanced":[],
        "income_streams":{}
    },
    "Similar Companies":[
        "similarweb_12_months_growth_delta",
        "similarweb_12_months_growth_percentile",
        "similarweb_12_months_growth_relative",
        "similarweb_12_months_growth_unique",
        "similarweb_3_months_growth_delta",
        "similarweb_3_months_growth_percentile",
        "similarweb_3_months_growth_relative",
        "similarweb_3_months_growth_unique",
        "similarweb_6_months_growth_delta",
        "similarweb_6_months_growth_percentile",
        "similarweb_6_months_growth_relative",
        "similarweb_6_months_growth_unique",
        "similarweb_chart"
    ],
    "IPO":[
        "ipo_round"
    ],
    "Patents":[
        "patents_count"
    ],
    "revenues":[
        "revenues",
        "latest_revenue_enhanced"
    ],
    "Founders":[
        "founders_score_cumulated",
        "founders",
        "founders_top_university",
        "founders_top_past_companies",
        "has_strong_founder",
        "has_super_founder",
        "has_promising_founder",
        "past_founders",
        "past_founders_raised_10m"
    ],
    "Kpi":[
        "kpi_summary"
    ],
    "Innovations":[
        "innovations",
        "innovations_count",
        "innovation_corporate_rank"
    ],
    "Events":[
        "participated_events"

    ]
  }

  const [filtersDialogIsOpen, setFiltersDialogIsOpen] = React.useState(false);
  let [currentFilterKey, setCurrentFilterKey] = React.useState("Basic Info");
  let [currentFirstPanelFilters, setFirstPanelFilters] = React.useState(filters);
  let [currentSecondPanelFilters, setSecondPanelFilters] = React.useState(currentFirstPanelFilters[currentFilterKey]);

  const [filterBreadCrumbs, setFilterBreadCrumbs] = React.useState([currentFilterKey]);

  return (
    <Material.Stack>
      <Material.Container>
        <AddFilterButton
          filteresDialogIsOpen={filtersDialogIsOpen}
          setFiltersDialogIsOpen={setFiltersDialogIsOpen}
        />
      </Material.Container>
      <FiltersDialog
        filters={filters}
        setFiltersDialogIsOpen={setFiltersDialogIsOpen}
        filtersDialogIsOpen={filtersDialogIsOpen}

        currentFilterKey={currentFilterKey}
        currentFirstPanelFilters={currentFirstPanelFilters}
        currentSecondPanelFilters={currentSecondPanelFilters}

        setCurrentFilterKey={setCurrentFilterKey}
        setFirstPanelFilters={setFirstPanelFilters}
        setSecondPanelFilters={setSecondPanelFilters}

        filterBreadCrumbs={filterBreadCrumbs}
        setFilterBreadCrumbs={setFilterBreadCrumbs}
      ></FiltersDialog>
    </Material.Stack>
  );
}
