import styles from './delivery.module.css';

const DeliverySection = () => {
  return (
<div className={styles.main_delivery}>
  <section className={styles.section}>
    <h1 className={styles.section__title}>
      Reliable, Efficient connect
      <span>Powered by Technology</span>
    </h1>
    <p className={styles.section__desc}>Our platform integrates advanced technology to provide reliable, efficient, and seamless collaboration for successful project outcomes</p>
    <div className={styles.features}>
      <div className={`${styles.feature} ${styles.featureOne}`}>
        <h2 className={styles.feature__title}>Instant Room-ID </h2>
        <p className={styles.feature__desc}>Unique room IDs are generated instantly, ensuring quick setup and easy access</p>
        <img className={styles.feature__img} src="https://kellychi22.github.io/frontend-mentor-solutions/10-four-card-feature-section/images/icon-supervisor.svg" alt="" />
      </div>
      <div className={styles.wrapper}>
        <div className={`${styles.feature} ${styles.featureTwo}`}>
          <h2 className={styles.feature__title}>Collaboration</h2>
          <p className={styles.feature__desc}>Instant communication, ensuring seamless collaboration and keeping everyone connected</p>
          <img className={styles.feature__img} src="https://kellychi22.github.io/frontend-mentor-solutions/10-four-card-feature-section/images/icon-team-builder.svg" alt="" />
        </div>
        <div className={`${styles.feature} ${styles.featureThree}`}>
          <h2 className={styles.feature__title}>Whiteboard</h2>
          <p className={styles.feature__desc}>simultaneous drawing and sharing, enhancing creativity and collaboration with various tools</p>
          <img className={styles.feature__img} src="https://kellychi22.github.io/frontend-mentor-solutions/10-four-card-feature-section/images/icon-karma.svg" alt="" />
        </div>
      </div>
      <div className={`${styles.feature} ${styles.featureFour}`}>
        <h2 className={styles.feature__title}>Secure</h2>
        <p className={styles.feature__desc}>Ensures only authorized users can access collaborative spaces, protecting your work</p>
        <img className={styles.feature__img} src="https://kellychi22.github.io/frontend-mentor-solutions/10-four-card-feature-section/images/icon-calculator.svg" alt="" />
      </div>
    </div>
  </section>
  </div>

  );
};

export default DeliverySection;
