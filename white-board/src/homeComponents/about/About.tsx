import styles from "./about.module.css"
const About= () =>{
    return(
        <div className={styles.rectanglegrandparent}>
            <div className={styles.rectangleparent}>
                <div className={styles.rightsidecardmr}>
                    <div className={styles.smallhead}>Simple and easy to use</div>
                    <div className={styles.bigheadparent}><h1 className={styles.bighead}><p className={styles.whitehow}>Get the best</p>Sketch Book for your creativity.</h1></div>
                    <div className={styles.pointsmr}>
                        <p>Easily create an account and register with secure authentication to access and participate in sessions.</p>
                        <br/>
                        <p>Generate unique room IDs instantly, share them with friends.</p>
                        <br/>
                        <p>Collaborate in real-time on drawings and diagrams with integrated chat</p>
                        <br/>
                        <p>Download and save your collaborative work securely for future reference and sharing.</p>
                    </div>
                    <div style={{paddingBottom:"2em"}}>
                     <div className={styles.buttonrectangularcard}>Learn More</div>   
                    </div>
                    
                </div>
                <div className={styles.imagescardmr}>
                    <img src="https://explaineverything.com/wp-content/uploads/2019/11/11-ideas-cover-2000x1001-2000x1001.jpg"></img>
                </div>
            </div>
        </div>
    )
}

export default About