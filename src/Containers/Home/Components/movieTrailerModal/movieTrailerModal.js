import $ from "jquery";
import React, { Component } from "react";
import { connect } from "react-redux";
import ModalVideo from "react-modal-video";
import "./index.scss";

// class MovieTrailerModal extends Component {
//   render() {
//     const { trailerURL } = this.props;
//     return (
//       <div
//         className="modal fade"
//         id="movieTrailerModal"
//         tabIndex={-1}
//         role="dialog"
//         aria-labelledby="modelTrailerTitleId"
//         aria-hidden="true"
//         data-focus="false"
//       >
//         <div className="modal-dialog" role="document">
//           <div className="modal-content">
//             <div className="modal-body">
//               <button
//                 type="button"
//                 className="close"
//                 data-dismiss="modal"
//                 aria-label="Close"
//               >
//                 <span aria-hidden="true">&times;</span>
//               </button>
//               <div className="embed-responsive embed-responsive-16by9"></div>

//               {/* <div className="embed-responsive embed-responsive-16by9">
//                 <iframe
//                   id="video"
//                   title="trailer"
//                   //   src={trailerURL ? trailerURL : ""}
//                   src=""
//                   frameBorder="0"
//                   //   allow="autoplay"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
class MovieTrailerModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <React.Fragment>
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId="ONcXsba7B30"
          onClose={() => this.setState({ isOpen: false })}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    trailerURL: state.trailerMovieReducer.trailerURL,
  };
};

export default connect(mapStateToProps, null)(MovieTrailerModal);
