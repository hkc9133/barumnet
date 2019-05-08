exports.getCertificationUser = (token) => {
    return token.decoded.payload
}