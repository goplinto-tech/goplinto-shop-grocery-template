export const structureCat = (payload) => ([...payload].map(item => ({ ...item, subcategories: [] })));
export const insertSubcat = (state, payload) => {
    const categories = state.categories;
    const subCatGroup = [...payload].reduce((r, item) => {
        r[item.category_id] = r[item.category_id] || [];
        r[item.category_id].push(item);
        return r;
    }, {});
    const newCategories = categories.map((itme) => subCatGroup[itme.category_id] ? { ...itme, subcategories: subCatGroup[itme.category_id] } : itme)
    return newCategories;
}

// category_id: 1018
// img_url: null
// record_status: "ACTIVE"
// sub_category_id: 1438
// sub_category_name: "All Purpose Cleaner "