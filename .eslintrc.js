module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-unused-vars": ["warn"]
    },
    "globals": {
        "Matrix": true,
        "Vector3": true,
        "mat3x3Identity": true,
        "mat3x3Translate": true,
        "mat3x3Scale": true,
        "mat3x3Rotate": true,
        "translateVertexList": true
    }
}
