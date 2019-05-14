export default function(state = {}, action) {
  
  if (action.type === 'SALEDETS') {
    const updatedInvoices = state.invoices 
      ? {...state.invoices, [action.insertedId]: {...action.rest}} 
      : {[action.insertedId]: {...action.rest}}

    state = {
      ...state,
      sales: {...updatedInvoices},
      salesIdArray: [...state.salesIdArray, action.insertedId]
    }
  }
  
  if (action.type === 'LOGIN') {
    state = {
      ...state,
      ...action,
      currentSale: action.salesIdArray[0] || null
    }; 
  }

  if (action.type === 'SET_SETTINGS') {
    state = {
      ...state,
      ...action
    }; 
  }

  if (action.type === 'TOGGLE_SETTINGS') {
    const newSettingsState = !state.showSettings
    state = {
      ...state,
      showSettings: newSettingsState
    }; 
  }
  // if (action.type == 'USER_LEFT') {
  //     const relations = state.relations && state.relations.map(profile => {
  //       if(profile.contact === action.id) {
  //         return {
  //           ...profile,
  //           online: false
  //         }
  //       }else{
  //         return profile
  //       }
        
  //     })
  //     state = {
  //       ...state,
  //       relations
  //     }
  // }

  // if (action.type == 'USER_JOINED') {
  //   const relations = state.relations && state.relations.map(profile => {
  //     if(profile.contact === action.id) {
  //       return {
  //         ...profile,
  //         online: true
  //       }
  //     }else{
  //       return profile
  //     }
      
  //   })
  //   state = {
  //     ...state,
  //     relations
  //   }
  // }

  // if (action.type == 'GET_PROFILE') {
  //   state = {
  //     ...state,
  //     ownProfile : action.data,
  //     copyOwnProfile : action.data
  //   }
  // }
  
  return state;
}