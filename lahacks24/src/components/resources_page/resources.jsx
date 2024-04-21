import React from 'react';
import "./resources.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

const Resources = () => {
  return (
    <div>
      <div>
          <div className='titleResources centered-resources'>
            <p className='titleTextRe'>Resources.</p>
          </div> {/* Close titleResources div */}
          <div className="parentContainer">
            <div className="resourcesList">
              <p className="font-sizer">National Suicide Prevention Lifeline: 1-800-273-TALK (1-800-273-8255)</p>
              <p className="font-sizer">Crisis Text Line: Text HOME to 741741 (in the United States)</p>
              <p className="font-sizer">National Institute of Mental Health (NIMH): 1-866-615-6464</p>
              <p className="font-sizer">National Alliance on Mental Illness (NAMI): 1-800-950-6264</p>
              <p className="font-sizer">Mental Health America: 1-800-273-TALK (1-800-273-8255)</p>
              <p className="font-sizer">Remember, these resources are here to support you, whether you're seeking immediate assistance during a crisis or looking for ongoing mental health care.</p>
            </div>
          </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Resources;