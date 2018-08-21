import React from "react";
import AriaModal from "react-aria-modal";
import styled, { keyframes } from "react-emotion";

const _ModalBody = styled("div")`
  background: #eee;
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 500px;
  img {
    width: 30%;
  }
  margin-top: 2rem;
  padding: 2rem;
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between
    width: 100%;
  }
  .actions {
    width: 100%;
  }
`;

const ShowDetailsModal = ({
  offers,
  venue,
  datetime,
  on_sale_datetime,
  description,
  lineup,
  id,
  artist_id,
  url,
  image_url,
  toggleShowDetails,
  ...rest
}) => (
  <AriaModal titleId="foo">
    <_ModalBody>
      <div className="content">
        <div>
          <p>{description}</p>
        </div>
        <img src={image_url} />
      </div>
      <div className="actions">
        <button onClick={e => toggleShowDetails()} />
      </div>
    </_ModalBody>
  </AriaModal>
);

export default ShowDetailsModal;
