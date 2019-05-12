export default function(state = {}, action) {
  if (action.type === 'POST_INVOICE') {
      state = {
        ...state,
        success: action.success,
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