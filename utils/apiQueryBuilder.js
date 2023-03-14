class QueryBuilder {

    constructor(query, queryJson) {
        this.query = query;
        this.queryJson = queryJson;
    }

    filter() {
        const queryObj = { ...this.queryJson };

        const fieldsToExclude = ['page', 'sort', 'limit', 'fields'];

        fieldsToExclude.forEach(function (field) { delete queryObj[field] });

        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, function (match) {
            return `$${match}`;
        });

        this.query = this.query.find(JSON.parse(queryString));

        return this;
    }

    sort() {
        if (this.queryJson.sort) {
            const sortBy = this.queryJson.sort.split(",").join(" ");

            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    fieldLimiter() {
        if (this.queryJson.fields) {
            const fields = this.queryJson.fields.split(",").join(" ");;

            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }

        return this;
    }

    paginate() {
        const page = parseInt(this.queryJson.page) || 1;
        const limit = parseInt(this.queryJson.limit) || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = QueryBuilder;