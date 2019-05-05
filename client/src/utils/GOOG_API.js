import axios from "axios";
require("dotenv").config();

export default {
    submitQuery: (query) => {
        return (
          axios.get(
              `https://www.googleapis.com/books/v1/volumes?q=intitle:` + query + `&key=` + process.env.REACT_APP_GBOOKS_KEY
          )
        )
    }
}