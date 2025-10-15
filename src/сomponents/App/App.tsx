import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <section className={styles.todoapp}>
      <NewTaskForm />
      <main className={styles.main}>
        <TaskList />
        <Footer />
      </main>
    </section>
  );
};

export default App;
