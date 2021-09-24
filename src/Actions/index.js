export const SelectedSiteData = (data) => {
	return{
		type:"siteData",
		data: data
	}
}

export const isLoadingCheck = (data) => {
	return{
		type:"isLoading",
		data: data
	}
}