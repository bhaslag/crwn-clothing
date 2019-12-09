import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
         [selectShop],
         shop => shop.collections
       );

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
  createSelector (
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
 )

export const selectIsCollectionFetching = createSelector(
   [selectShop],
   shop => shop.isFetching
);

//checks if collections is loaded, if not loaded the value returns false
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  //double bang returns the boolean of a truthy/falsey value
  shop => !!shop.collections
);