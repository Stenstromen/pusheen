import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Custom Helmet component to replace react-helmet
 * Manages document head elements (title, meta tags, link tags)
 */
function Helmet({ children }) {
  const createdElementsRef = useRef([]);
  const previousTitleRef = useRef(null);

  useEffect(() => {
    const head = document.head;
    const createdElements = [];

    // Process each child element
    React.Children.forEach(children, (child) => {
      if (!child) return;

      const { type, props } = child;

      if (type === "title") {
        // Handle title tag
        const titleElement = document.querySelector("title");
        const newTitleText = props.children || "";
        
        // Store previous title for cleanup
        if (!previousTitleRef.current && titleElement) {
          previousTitleRef.current = titleElement.textContent;
        }
        
        if (titleElement) {
          titleElement.textContent = newTitleText;
        } else {
          const newTitle = document.createElement("title");
          newTitle.textContent = newTitleText;
          head.appendChild(newTitle);
          createdElements.push(newTitle);
        }
      } else if (type === "meta") {
        // Handle meta tags
        // Check if meta tag already exists (by name or property)
        let existingMeta = null;
        // eslint-disable-next-line react/prop-types
        if (props.name) {
          // eslint-disable-next-line react/prop-types
          existingMeta = document.querySelector(`meta[name="${props.name}"]`);
          // eslint-disable-next-line react/prop-types
        } else if (props.property) {
          // eslint-disable-next-line react/prop-types
          existingMeta = document.querySelector(`meta[property="${props.property}"]`);
        }

        if (existingMeta) {
          // Update existing meta tag
          Object.keys(props).forEach((key) => {
            if (key !== "children") {
              existingMeta.setAttribute(key, props[key]);
            }
          });
        } else {
          // Create and add new meta tag
          const meta = document.createElement("meta");
          Object.keys(props).forEach((key) => {
            if (key !== "children") {
              meta.setAttribute(key, props[key]);
            }
          });
          head.appendChild(meta);
          createdElements.push(meta);
        }
      } else if (type === "link") {
        // Handle link tags
        // eslint-disable-next-line react/prop-types
        const rel = props.rel;
        // eslint-disable-next-line react/prop-types
        const href = props.href;
        let existingLink = null;
        
        if (rel && href) {
          existingLink = document.querySelector(`link[rel="${rel}"][href="${href}"]`);
        }

        if (existingLink) {
          // Update existing link tag
          Object.keys(props).forEach((key) => {
            if (key !== "children") {
              existingLink.setAttribute(key, props[key]);
            }
          });
        } else {
          // Create and add new link tag
          const link = document.createElement("link");
          Object.keys(props).forEach((key) => {
            if (key !== "children") {
              link.setAttribute(key, props[key]);
            }
          });
          head.appendChild(link);
          createdElements.push(link);
        }
      }
    });

    // Store created elements for cleanup
    createdElementsRef.current = createdElements;

    // Cleanup function
    return () => {
      // Remove elements we created
      createdElementsRef.current.forEach((element) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      
      // Restore previous title if we modified it
      if (previousTitleRef.current !== null) {
        const titleElement = document.querySelector("title");
        if (titleElement) {
          titleElement.textContent = previousTitleRef.current;
        }
        previousTitleRef.current = null;
      }
    };
  }, [children]);

  // Helmet doesn't render anything visible
  return null;
}

Helmet.propTypes = {
  children: PropTypes.node,
};

export default Helmet;

