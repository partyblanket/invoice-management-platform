export default function(state = {}, action) {
  
  if (action.type === 'SALEDETS') {
    const updatedInvoices = state.invoices 
      ? {...state.invoices, [action.insertedId]: {...action.rest}} 
      : {[action.insertedId]: {...action.rest}}

    const newSaleIdArray = 
      state.salesIdArray.indexOf(action.insertedId) === -1
      ? [...state.salesIdArray, action.insertedId]
      : [...state.salesIdArray]
      
    state = {
      ...state,
      sales: {...updatedInvoices},
      salesIdArray: newSaleIdArray
    }
  }
  
  if (action.type === 'LOGIN' || action.type === 'REGISTER') {
    const currentSale = action.salesIdArray ? action.salesIdArray[0] : null
    state = {
      ...state,
      userid: action.userid,
      email: action.email,
      company: action.company,
      currentSale,
      nextSale: action.nextSale,
      salesIdArray: action.salesIdArray,
      error: action.error,
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

  if (action.type === 'TOGGLE_SIDEBAR') {
    const newSidebarState = !state.showSidebar
    state = {
      ...state,
      showSidebar: newSidebarState
    }; 
  }

  if (action.type === 'SET_CURRENTSALE') {
    state = {
      ...state,
      currentSale: action.saleid
    }; 
  }
  
  
  return state;
}