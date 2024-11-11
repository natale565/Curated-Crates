function Jumbotron({ children }) {
    return (
      <div
        style={{ fontFamily: 'Quicksand', height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
      >
        {children}
      </div>
    );
  }
  
  export default Jumbotron;