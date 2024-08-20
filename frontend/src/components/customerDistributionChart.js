import React, { useState, useEffect } from 'react';
import axios from 'axios';
import USAMap from "react-usa-map";
import { scaleLinear } from 'd3-scale';

// This is a simplified mapping. You might need a more comprehensive one.
const cityToState = {
    'Stockton': 'CA',
    'El Paso': 'TX',
    'Plano': 'TX',
    'Kansas City': 'MO', // Note: There's also a Kansas City in Kansas, but the larger one is in Missouri
    'Seattle': 'WA',
    'Washington': 'DC',
    'Las Vegas': 'NV',
    'San Antonio': 'TX',
    'Oakland': 'CA',
    'St. Paul': 'MN',
    'Dallas': 'TX',
    'Houston': 'TX',
    'Hialeah': 'FL',
    'Wichita': 'KS',
    'Boston': 'MA',
    'Austin': 'TX',
    'San Jose': 'CA',
    'Laredo': 'TX',
    'Cincinnati': 'OH',
    'Fort Worth': 'TX',
    'Detroit': 'MI',
    'Henderson': 'NV',
    'Colorado Springs': 'CO',
    'Aurora': 'CO',
    'Jacksonville': 'FL',
    'San Francisco': 'CA',
    'Chula Vista': 'CA',
    'Chicago': 'IL',
    'Los Angeles': 'CA',
    'Columbus': 'OH',
    'Lexington': 'KY',
    'Tucson': 'AZ',
    'Santa Ana': 'CA',
    'Jersey City': 'NJ',
    'Denver': 'CO',
    'Toledo': 'OH',
    'Corpus Christi': 'TX',
    'Memphis': 'TN',
    'Bakersfield': 'CA',
    'Atlanta': 'GA',
    'Tulsa': 'OK',
    'Greensboro': 'NC',
    'Minneapolis': 'MN',
    'Riverside': 'CA',
    'Buffalo': 'NY',
    'Newark': 'NJ',
    'Gilbert': 'AZ',
    'Oklahoma City': 'OK',
    'Orlando': 'FL',
    'St. Petersburg': 'FL',
    'Garland': 'TX',
    'Honolulu': 'HI',
    'St. Louis': 'MO',
    'New York': 'NY',
    'Chattanooga': 'TN',
    'Baltimore': 'MD',
    'San Diego': 'CA',
    'Nashville': 'TN',
    'Glendale': 'AZ',
    'Philadelphia': 'PA',
    'Charlotte': 'NC',
    'Tampa': 'FL',
    'Phoenix': 'AZ',
    'Portland': 'OR',
    'Fort Wayne': 'IN',
    'Anaheim': 'CA',
    'Lincoln': 'NE',
    'Miami': 'FL',
    'Cleveland': 'OH',
    'Arlington': 'TX',
    'Indianapolis': 'IN',
    'Madison': 'WI',
    'Raleigh': 'NC'
};

const USACustomerMap = () => {
    const [stateData, setStateData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/customers/customer-distribution');
                const cityData = response.data;

                // Aggregate data by state
                const aggregatedData = cityData.reduce((acc, city) => {
                    const state = cityToState[city._id];
                    if (state) {
                        if (!acc[state]) {
                            acc[state] = 0;
                        }
                        acc[state] += city.customerCount;
                    }
                    return acc;
                }, {});

                setStateData(aggregatedData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    const maxCustomers = Math.max(...Object.values(stateData), 1);
    const colorScale = scaleLinear().domain([0, maxCustomers]).range(['#e6f2ff', '#0066cc']);

    const statesCustomConfig = () => {
        let config = {};
        Object.entries(stateData).forEach(([state, count]) => {
            config[state] = {
                fill: colorScale(count),
                clickHandler: () => alert(`${state}: ${count} customers`)
            };
        });
        return config;
    };

    return (
        <div>
            <h2>Customer Distribution Across US States</h2>
            
            <USAMap width={400} height={400} customize={statesCustomConfig()} />
            <div style={{ marginTop: '20px' }}>
                <span style={{ backgroundColor: colorScale(0), padding: '5px' }}>Fewer Customers</span>
                <span style={{ backgroundColor: colorScale(maxCustomers), color: 'white', padding: '5px' }}>More Customers</span>
            </div>
        </div>
    );
};

export default USACustomerMap;