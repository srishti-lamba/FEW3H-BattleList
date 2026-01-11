import {useState, useEffect} from 'react';

export default function Settings() {

  const [show, setShow] = useState<boolean>(false);

  const handleClick_settings = ( () => {
    console.log("Button clicked!")
    setShow(!show)
  })

  const handleClick_overlay = ( () => {
    console.log("Overlay clicked!")
    setShow(false)
  })

  // Run once
  useEffect(() => {
    console.log(show)
  }, [])

  useEffect(() => {
    console.log("Show changed: " + show)
  }, [show])

  return (
    <div className="settings">
      
      <button
        title="Settings" 
        onClick={handleClick_settings} 
      />

      {
        show && (
          <>
            <div 
              className="overlay"
              onClick={handleClick_overlay}
            />
            <div
              className="popup"
            >

              <svg>
                <defs>
                  <clipPath id="two-diamonds"  clipPathUnits="objectBoundingBox">
                    <path d="m 0 30 L 30 0 L 49 19 L 68 0 L 98 30 L 68 60 L 49 41 L 30 60 Z 
                      m 36 20 L 47 39 L 38 30 L 47 21 L 36 10 L 16 30 Z 
                      M 51 21 L 60 30 L 51 39 L 62 50 L 82 30 L 62 10 L 51 21 Z" />
                  </clipPath>
                </defs>
              </svg>

              <h1>Settings</h1>
              <span className="section-wrapper">
                <span className="section">Difficulty</span>
              </span>
            </div>

          </>
        )
      }
     
    </div>
  );
}