import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Steps() {
  const stepBoxStyles = {
    display: "flex",
    flexDirection: "row",  // Default direction for larger screens (side by side)
    alignItems: "stretch",
    height: "450px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    p: 2,
    mb: 2,
    minWidth: "300px",
    textAlign: "left",
    gap: "10px",
    alignSelf: "flex-start",
    backgroundColor: '#333',
    flex: 1, // Ensure that the boxes have equal space on larger screens
    '@media (max-width: 600px)': {
      flexDirection: 'column', // Stack vertically on small screens
      height: 'auto',
    },
  };

  const numberBoxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pr: 2,
    mr: 2,
    borderRight: "1px solid grey",
  };

  const contentBoxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    maxWidth: "400px",
    flexGrow: 1,
  };

  const textBoxStyles = {
    textAlign: "left", 
    marginTop: "10px", 
    maxWidth: "400px",
  };

  return (
    <>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{
            fontFamily: 'Quicksand',
            backgroundColor: "#333",
            color: "white",
            "&:hover": {
              backgroundColor: "#555",
            },
            padding: "8px 16px",
            fontSize: "0.875rem",
            marginTop: "75px",
            marginBottom: "16px",
          }}
        >
          ← Back to Subscription Boxes
        </Button>
      </Link>

      <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mb: 3 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontFamily: 'Quicksand',
            fontSize: "2.4rem",
            fontWeight: "bold",
            background:
              "linear-gradient(90deg, #ffffff, #FFBC00, #ff8800, #FFBC00, #ffffff)",
            backgroundSize: "300% 100%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            animation: "glimmer-horizontal 6s linear infinite",
          }}
          gutterBottom
        >
          Enjoy Carefully Selected Items That Fit Your Interests! Here&apos;s How It Works:
        </Typography>
        <style>
          {`
                    @keyframes glimmer-horizontal {
                        0% {
                            background-position: -200%;
                        }
                        100% {
                            background-position: 200%;
                        }
                    }
                `}
        </style>
      </Box>

      <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: 'wrap' }}>
        {/* Step 1 */}
        <Box sx={stepBoxStyles}>
          <Box sx={numberBoxStyles}>
            <h3 style={{ margin: 0 }}>Step</h3>
            <h1 style={{ margin: 0 }}>1</h1>
          </Box>
          <Box sx={contentBoxStyles}>
            <img
              src="/images/How-It-Works-Step-1.jpg"
              alt="Step 1"
              style={{
                maxWidth: "100%",
                height: "300px", 
                objectFit: "cover",
              }}
            />
            <Box sx={textBoxStyles}>
              Choose Your Box – Begin by exploring our many different unique box
              options. Each is thoughtfully crafted to bring you joy, discovery,
              and quality with every delivery.
            </Box>
          </Box>
        </Box>

        {/* Step 2 */}
        <Box sx={stepBoxStyles}>
          <Box sx={numberBoxStyles}>
            <h3 style={{ margin: 0 }}>Step</h3>
            <h1 style={{ margin: 0 }}>2</h1>
          </Box>
          <Box sx={contentBoxStyles}>
            <img
              src="/images/step-2.png"
              alt="Step 2"
              style={{
                maxWidth: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <Box sx={textBoxStyles}>
              Choose your shipping frequency – Select a shipping frequency that matches your desired
              experience.
            </Box>
          </Box>
        </Box>

        {/* Step 3 */}
        <Box sx={stepBoxStyles}>
          <Box sx={numberBoxStyles}>
            <h3 style={{ margin: 0 }}>Step</h3>
            <h1 style={{ margin: 0 }}>3</h1>
          </Box>
          <Box sx={contentBoxStyles}>
            <img
              src="/images/How-It-Works-Step-3.jpg"
              alt="Step 3"
              style={{
                maxWidth: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <Box sx={textBoxStyles}>
              Get Your Crate – Sit back, relax, and let the excitement build!
              Your curated crate will arrive right at your doorstep, packed with
              delightful surprises all tailored to bring you joy and discovery
              with every unboxing.
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Steps;
