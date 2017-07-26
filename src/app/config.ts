export const config = {
	endpoint: "http://112.196.1.66:8081",
	buildPath: function (uri) :string {
		return this.endpoint + '/' + uri;
	}
}