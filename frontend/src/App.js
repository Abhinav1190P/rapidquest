import SalesOverTimeChart from "./components/salesOverTimeChart";
import SalesGrowthRateChart from './components/growthRateChart';
import NewCustomersChart from "./components/newCustomers";
import RepeatCustomersChart from './components/repeatCustomersChart';
import GeographicalDistribution from './components/customerDistributionChart';
import CustomerLifetimeValueCohorts from './components/lifeTimeCohorts';
import './App.css';

function App() {
  return (
    <div className="App" style={{ height: 'max-content', padding: '20px' }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <SalesOverTimeChart />
        </div>
        <div style={{ width: 'max-content' }}>
          <GeographicalDistribution />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <NewCustomersChart />
        </div>

        <div style={{ flex: 1 }}>
          <SalesGrowthRateChart />

        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', marginTop:'60px' }}>
        <div style={{ flex: 1 }}>
          <RepeatCustomersChart />

        </div>
        <div style={{ flex: 1 }}>
          <CustomerLifetimeValueCohorts />

        </div>
      </div>

    </div>
  );
}

export default App;
