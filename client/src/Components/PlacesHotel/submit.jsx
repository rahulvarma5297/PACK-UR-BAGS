import React from "react";
import Btn from "../Btn";

function review_rating() {
    const modalBg = document.querySelector(".modal-bg");
    modalBg.classList.toggle("bg-active")
}

function Submit(props){
    return(
        <div className="modal-bg">
                    <div className="review-submit">
                        <h2>Submit your review and rating</h2>
                        <form action={`/places/review/${props.id}`}  method="post">
                            <label htmlFor="rating">Give your rating:</label>
                            <select name="rating" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select><br/>
                            <label htmlFor="review">Submit your review:</label>
                            <br /><textarea name="review" id="review" cols="auto" rows="auto"
                                placeholder="submit your review"></textarea><br/>
                            <Btn type="submit" value="Submit"/>
                        </form>
                        <span onClick={review_rating}>X</span>
                    </div>
                </div>
    )
}
export default Submit;