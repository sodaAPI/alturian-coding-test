import React, { useState } from "react";

export default function FAQ({ question, answer }) {

    return (
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title text-xl font-medium">{question}</div>
  <div className="collapse-content">
    <p>{answer}</p>
  </div>
</div>
    );
}
