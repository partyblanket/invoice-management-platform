export default function(state = {}, action) {
  
  if (action.type === 'POST_SALEDETS' || action.type === 'GET_SALEDETS' || action.type === 'SALE_CREATED') {
    const arrayIndexToReplace = state.salesList.findIndex(el => el._id === action.insertedId)
    const newSalesList = [...state.salesList]
    console.log(arrayIndexToReplace);
    
    arrayIndexToReplace === -1 ? newSalesList.push(action.data) : newSalesList[arrayIndexToReplace] = action.data
    state = {
      ...state,
      salesList: newSalesList,
      currentSale: action.insertedId,
    }
  }
  
  if (action.type === 'LOGIN' || action.type === 'REGISTER') {
    state = {
      ...state,
      userid: action.userid,
      username: action.username,
      company: action.company,
      error: action.error,
      salesList: action.salesList || [],
      templateArray: action.templateArray,
    }; 
  }

  if (action.type === 'SET_SETTINGS') {
    state = {
      ...state,
      ...action
    }; 
  }

  if (action.type === 'ERROR') {
    state = {
      ...state,
      error: action.error
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

  if (action.type === 'GET_SALES_LIST') {
    console.log(action.sales)
    state = {
      ...state,
      saleslist: action.sales
    }; 
  }

  if (action.type === 'SUBMIT_TEMPLATE') {
    state = {
      ...state,
      templateArray: action.templateArray
    }; 
  }

  return state;
}