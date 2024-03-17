
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import styles from './home.module.css'; // Import the CSS module

const Home = () => {
  return (
    <div className={styles['home-container']}> {/* Use local class names */}
      <Navbar />
      <main>
        <section className={styles.hero}>
          <h2 className={styles['hero-title']}>Unleash Your Creativity</h2>
          <p className={styles['hero-description']}>Draw, Collaborate, Innovate</p>
          <div className={styles['button-container']}>
            <Link to="/login" className={styles.link}>
              <button className={`${styles.button} ${styles.primary}`}>Login</button>
            </Link>
            <Link to="/signup" className={styles.link}>
              <button className={`${styles.button} ${styles.secondary}`}>Sign Up</button>
            </Link>
          </div>
        </section>
        <section id="features" className={styles.features}>
          <h2 className={styles['section-title']}>Features</h2>
          <div className={styles.feature}>
            <i className={`fas fa-paint-brush ${styles['feature-icon']}`}></i>
            <h3 className={styles['feature-title']}>Real-time Drawing</h3>
            <p className={styles['feature-description']}>Draw together in real-time with your team or friends.</p>
          </div>
          <div className={styles.feature}>
            <i className={`fas fa-users ${styles['feature-icon']}`}></i>
            <h3 className={styles['feature-title']}>Collaborative Whiteboard</h3>
            <p className={styles['feature-description']}>Collaborate on charts, diagrams, sketches, and more.</p>
          </div>
          <div className={styles.feature}>
            <i className={`fas fa-comments ${styles['feature-icon']}`}></i>
            <h3 className={styles['feature-title']}>Instant Messaging</h3>
            <p className={styles['feature-description']}>Chat with your team members while brainstorming.</p>
          </div>
        </section>
        <section id="about" className={styles.about}>
          <h2 className={styles['section-title']}>About Us</h2>
          <p className={styles['about-description']}>We are a team passionate about creativity and collaboration. Our mission is to provide a platform where individuals can express their ideas freely and collaborate with others in real-time.</p>
        </section>
        <section id="contact" className={styles.contact}>
          <h2 className={styles['section-title']}>Contact Us</h2>
          <p className={styles['contact-description']}>Have questions or feedback? We'd love to hear from you!</p>
          <div className={styles['button-container']}>
            <a href="mailto:contact@example.com" className={styles.link}>
              <button className={`${styles.button} ${styles.secondary}`}>Send Email</button>
            </a>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Whiteboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

