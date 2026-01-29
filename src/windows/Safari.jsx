import { blogPosts } from "../constants";
import WindowControls from "#components/WindowControls.jsx";
import windowWrapper from "#hoc/windowWrapper";

const Safari = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />
        <h2>Articles</h2>
      </div>

      <div className="blog">
        <h2>Latest Articles</h2>
        {blogPosts.map(({ id, date, title, image, link }) => (
          <div key={id} className="blog-post">
            <div className="col-span-2">
                <img src={image} alt={title} />
            </div>


            <div className="content">
              <p>{date}</p>
              <h3>{title}</h3>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const SafariWindow = windowWrapper(Safari, "safari");

export default SafariWindow;