import styles from './styles/App.module.scss';
import AppBlock from './components/AppBlock';
import FilterBlock from './components/FilterBlock';

function App() {
  return (
    <div className={styles.app}>
      <h1>To do List</h1>
      <div className={styles.app__wrapper}>
        <FilterBlock />
        <AppBlock />
      </div>
    </div>
  );
}

export default App;
