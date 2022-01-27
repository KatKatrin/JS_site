//import { bind } from "core-js/core/function";
import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
  const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

        checkNumInputs('#width');
        checkNumInputs('#height');

        function bindactionToElem (event, elem, prop) {
          elem.forEach((item,i) => {
            item.addEventListener(event, ()=> {

              switch(item.nodeName) {
                case 'SPAN':
                            state[prop] = i;
                            break;
                case 'INPUT':
                            if (item.getAttribute('type') === 'checkbox') {
                              i === 0 ? state[prop] = 'cold' : state[prop] = 'warm';
                              elem.forEach((box, j) => {
                                box.checked = false;
                                if (i === j) {
                                  box.checked = true;
                                }
                              })
                            } else {
                              state[prop] = item.value;
                            }
                            break;
                case 'SELECT':
                            state[prop] = item.value;
                            break;
              }

            //   if(elem.length > 1){
            //     state[prop] = i;
            //   } else {
            //     state[prop] = item.value;
            //   }
              console.log(state)
            
          })
          })
        };

        bindactionToElem('click', windowForm, 'form');
        bindactionToElem('input', windowHeight, 'height');
        bindactionToElem('input', windowWidth, 'width');
        bindactionToElem('change', windowType, 'type');
        bindactionToElem('change', windowProfile, 'profile')
        
};

export default changeModalState;