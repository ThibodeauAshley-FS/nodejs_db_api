// Functions for Controlling Routes

exports.getPainting = async (req, res ) => {
    res.status(200).json({
        message: ""
    });
};

exports.getPaintingByID = async (req, res ) => {
    res.status(200).json({
        message: "Painting.-.POST"
    });
};

exports.createPainting = async (req, res ) => {
    const {id} = req.params;
    res.status(200).json({
        message: "Painting.-.GET",
        id: id
    });
};

exports.updatePainting = async (req, res ) => {
    const {id} = req.params;
    res.status(200).json({
        message: "Painting.-.PATCH",
        id: id
    });
};
exports.deletePainting = async (req, res ) => {
    const {id} = req.params;
    res.status(200).json({
        message: "Painting.-.DELETE",
        id: id
    });
};