import {
  Faqs,
  Footer,
  Hero,
  Nav,
  Roadmap,
  Story,
  Team,
} from "../../components";
import "../styles.css";

const Landinpage = () => {
  return (
    <div>
      <div className="header">
        <Nav />
        <Hero />
      </div>
      <div className="story " id="ourStory">
        <Story />
      </div>
      <div className="gradient3" id="roadmap">
        <Roadmap />
      </div>
      <div id="team">
        <Team />
      </div>
      <div className="story ">
        <div id="faqs">
          <Faqs />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Landinpage;
