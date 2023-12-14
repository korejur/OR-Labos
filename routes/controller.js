const pool = require('../routes/db');

const getMuzeji = (req, res) => {
    try {
        pool.query("SELECT * FROM muzej", (error, results) => {
            if (error) {
                const response = {
                    status: "Error",
                    message: "An error occurred while fetching muzeji",
                    error: error.message,
                    links: [
                        {
                            href: "/api/v1/muzeji",
                            rel: "self",
                            type: "GET"
                        }
                    ]
                };
                res.setHeader('Content-Type', 'application/json');
                res.status(500).json(response);
            } else {
                if (results.rows.length === 0) {
                    const response = {
                        status: "Not Found",
                        message: "No muzeji found",
                        response: null,
                        links: [
                            {
                                href: "/api/v1/muzeji",
                                rel: "self",
                                type: "GET"
                            }
                        ]
                    };
                    res.setHeader('Content-Type', 'application/json');
                    res.status(404).json(response);
                } else {
                    const response = {
                        status: "OK",
                        message: "Fetched muzeji successfully",
                        response: results.rows,
                        links: [
                            {
                                href: "/api/v1/muzeji",
                                rel: "self",
                                type: "GET"
                            }
                        ]
                    };
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(response);
                }
            }
        });
    } catch (exception) {
        const response = {
            status: "Error",
            message: "An unexpected error occurred.",
            error: exception.message,
            links: [
                {
                    href: "/api/v1/muzeji",
                    rel: "self",
                    type: "GET"
                }
            ]
        };
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json(response);
    }
};


const getMuzejById = (req, res) => {
    try {
        const idMuzeja = parseInt(req.params.id);

        pool.query("SELECT * FROM muzej WHERE idMuzeja = $1", [idMuzeja], (error, results) => {
            if (error) {
                const response = {
                    status: "Error",
                    message: "An error occurred while fetching data from the database.",
                    error: error.message,
                    links: [
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        }
                    ]
                };
                return res.status(500).json(response);
            }

            if (results.rows.length === 0) {
                const response = {
                    status: "Not Found",
                    message: "No muzej found for the specified ID.",
                    links: [
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        }
                    ]
                };
                return res.status(404).json(response);
            }

            const response = {
                status: "OK",
                message: "Fetched muzej successfully",
                data: results.rows,
                links: [
                    {
                        href: "/api/v1/muzeji",
                        rel: "muzeji",
                        type: "GET"
                    }
                ]
            };
            res.status(200).json(response);
        });
    } catch (exception) {
        const response = {
            status: "Error",
            message: "An unexpected error occurred.",
            error: exception.message
        };
        res.status(500).json(response);
    }
};


const getIzlozbe = (req, res) => {
    try {
        pool.query("SELECT * FROM izlozba", (error, results) => {
            if (error) {
                const response = {
                    status: "Error",
                    message: "An error occurred while fetching izlozbe",
                    error: error.message,
                    links: [
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        },
                        {
                            href: "/api/v1/muzeji/izlozbe",
                            rel: "izlozbe",
                            type: "GET"
                        }
                    ]
                };
                return res.status(500).json(response);
            }

            if (results.rows.length === 0) {
                const response = {
                    status: "Not Found",
                    message: "No izlozbe found",
                    response: null,
                    links: [
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        },
                        {
                            href: "/api/v1/muzeji/izlozbe",
                            rel: "izlozbe",
                            type: "GET"
                        }
                    ]
                };
                return res.status(404).json(response);
            }

            const response = {
                status: "OK",
                message: "Fetched izlozbe successfully",
                response: results.rows,
                links: [
                    {
                        href: "/api/v1/muzeji",
                        rel: "muzeji",
                        type: "GET"
                    },
                    {
                        href: "/api/v1/muzeji/izlozbe",
                        rel: "izlozbe",
                        type: "GET"
                    }
                ]
            };
            res.status(200).json(response);
        });
    } catch (exception) {
        const response = {
            status: "Error",
            message: "An unexpected error occurred.",
            error: exception.message,
            links: [
                {
                    href: "/api/v1/muzeji",
                    rel: "muzeji",
                    type: "GET"
                },
                {
                    href: "/api/v1/muzeji/izlozbe",
                    rel: "izlozbe",
                    type: "GET"
                }
            ]
        };
        res.status(500).json(response);
    }
};


const getIzlozbaById = (req, res) => {
    try {
        const idIzlozbe = parseInt(req.params.id);

        pool.query("SELECT * FROM izlozba WHERE idIzlozbe = $1", [idIzlozbe], (error, results) => {
            if (error) {
                const response = {
                    status: "Error",
                    message: "An error occurred while fetching the izlozba",
                    error: error.message,
                    links: [
                        {
                            href: "/api/v1/muzeji/izlozbe",
                            rel: "izlozbe",
                            type: "GET"
                        },
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        }
                    ]
                };
                return res.status(500).json(response);
            }

            if (results.rows.length === 0) {
                const response = {
                    status: "Not Found",
                    message: "No izlozba found for the specified ID",
                    response: null,
                    links: [
                        {
                            href: "/api/v1/muzeji/izlozbe",
                            rel: "izlozbe",
                            type: "GET"
                        },
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        }
                    ]
                };
                return res.status(404).json(response);
            }

            const response = {
                status: "OK",
                message: "Fetched izlozba successfully",
                response: results.rows,
                links: [
                    {
                        href: "/api/v1/muzeji/izlozbe",
                        rel: "izlozbe",
                        type: "GET"
                    },
                    {
                        href: "/api/v1/muzeji",
                        rel: "muzeji",
                        type: "GET"
                    }
                ]
            };
            res.status(200).json(response);
        });
    } catch (exception) {
        const response = {
            status: "Error",
            message: "An unexpected error occurred.",
            error: exception.message,
            links: [
                {
                    href: "/api/v1/muzeji/izlozbe",
                    rel: "izlozbe",
                    type: "GET"
                },
                {
                    href: "/api/v1/muzeji",
                    rel: "muzeji",
                    type: "GET"
                }
            ]
        };
        res.status(500).json(response);
    }
};


const getIzlozbaByOpis = (req, res) => {
    try {
        const opis = req.params.opis;

        pool.query("SELECT * FROM izlozba WHERE opis = $1", [opis], (error, results) => {
            if (error) {
                const response = {
                    status: "Error",
                    message: "An error occurred while fetching the izlozba",
                    error: error.message,
                    links: [
                        {
                            href: "/api/v1/muzeji/izlozbe",
                            rel: "izlozbe",
                            type: "GET"
                        },
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        }
                    ]
                };
                return res.status(500).json(response);
            }

            if (results.rows.length === 0) {
                const response = {
                    status: "Not Found",
                    message: "No izlozba found for the specified description",
                    response: null,
                    links: [
                        {
                            href: "/api/v1/muzeji/izlozbe",
                            rel: "izlozbe",
                            type: "GET"
                        },
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        }
                    ]
                };
                return res.status(404).json(response);
            }

            const response = {
                status: "OK",
                message: "Fetched izlozba successfully",
                response: results.rows,
                links: [
                    {
                        href: "/api/v1/muzeji/izlozbe",
                        rel: "izlozbe",
                        type: "GET"
                    },
                    {
                        href: "/api/v1/muzeji",
                        rel: "muzeji",
                        type: "GET"
                    }
                ]
            };
            res.status(200).json(response);
        });
    } catch (exception) {
        const response = {
            status: "Error",
            message: "An unexpected error occurred.",
            error: exception.message,
            links: [
                {
                    href: "/api/v1/muzeji/izlozbe",
                    rel: "izlozbe",
                    type: "GET"
                },
                {
                    href: "/api/v1/muzeji",
                    rel: "muzeji",
                    type: "GET"
                }
            ]
        };
        res.status(500).json(response);
    }
};


const addIzlozba = async (req, res) => {
    try {
        const { idizlozbe, nazivizlozbe, datumpocetka, datumzavrsetka, opis, vrstaizlozbe, idmuzeja } = req.body;
        console.log("Received request body:", req.body);
        
        if (!idizlozbe || !nazivizlozbe || !datumpocetka || !datumzavrsetka || !opis || !vrstaizlozbe || !idmuzeja) {
            return res.status(400).json({
                status: "Bad Request",
                message: "Missing required fields in the request body",
                links: [
                    {
                        href: "/api/v1/muzeji/izlozbe",
                        rel: "izlozbe",
                        type: "GET"
                    },
                    {
                        href: "/api/v1/muzeji",
                        rel: "muzeji",
                        type: "GET"
                    }
                ]
            });
        }

        const existingIzlozba = await pool.query("SELECT * FROM izlozba WHERE idIzlozbe = $1", [idizlozbe]);

        if (existingIzlozba.rows.length > 0) {
            return res.status(404).json({
                status: "Conflict",
                message: "Izlozba already exists",
                links: [
                    {
                        href: "/api/v1/muzeji/izlozbe",
                        rel: "izlozbe",
                        type: "GET"
                    },
                    {
                        href: "/api/v1/muzeji",
                        rel: "muzeji",
                        type: "GET"
                    }
                ]
            });
        }

        await pool.query(
            "INSERT INTO izlozba (idizlozbe, nazivizlozbe, datumpocetka, datumzavrsetka, opis, vrstaizlozbe, idmuzeja) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [idizlozbe, nazivizlozbe, datumpocetka, datumzavrsetka, opis, vrstaizlozbe, idmuzeja]
        );

        return res.status(200).json({
            status: "Created",
            message: "Izlozba added successfully",
            links: [
                {
                    href: "/api/v1/muzeji/izlozbe",
                    rel: "izlozbe",
                    type: "GET"
                },
                {
                    href: "/api/v1/muzeji",
                    rel: "muzeji",
                    type: "GET"
                }
            ]
        });
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return res.status(500).json({
            status: "Error",
            message: "An unexpected error occurred",
            error: error.message,
            links: [
                {
                    href: "/api/v1/muzeji/izlozbe",
                    rel: "izlozbe",
                    type: "GET"
                },
                {
                    href: "/api/v1/muzeji",
                    rel: "muzeji",
                    type: "GET"
                }
            ]
        });
    }
};


const deleteIzlozba = (req, res) => {
    try {
        const idIzlozbe = parseInt(req.params.id);

        pool.query("SELECT * FROM izlozba WHERE idIzlozbe = $1", [idIzlozbe], async (error, results) => {
            try {
                if (error) {
                    throw new Error("An error occurred while checking for existing izlozba");
                }

                if (results.rows.length === 0) {
                    return res.status(404).json({
                        status: "Not Found",
                        message: "No izlozba found for the specified ID",
                        links: [
                            {
                                href: "/api/v1/muzeji/izlozbe",
                                rel: "izlozbe",
                                type: "GET"
                            },
                            {
                                href: "/api/v1/muzeji",
                                rel: "muzeji",
                                type: "GET"
                            }
                        ]
                    });
                }

                await pool.query("DELETE FROM izlozba WHERE idIzlozbe = $1", [idIzlozbe]);

                res.status(200).json({
                    status: "OK",
                    message: "Izlozba deleted successfully",
                    links: [
                        {
                            href: "/api/v1/muzeji/izlozbe",
                            rel: "izlozbe",
                            type: "GET"
                        },
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        }
                    ]
                });
            } catch (error) {
                res.status(500).json({
                    status: "Error",
                    message: "An error occurred while deleting izlozba",
                    error: error.message,
                    links: [
                        {
                            href: "/api/v1/muzeji/izlozbe",
                            rel: "izlozbe",
                            type: "GET"
                        },
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        }
                    ]
                });
            }
        });
    } catch (exception) {
        res.status(500).json({
            status: "Error",
            message: "An unexpected error occurred.",
            error: exception.message,
            links: [
                {
                    href: "/api/v1/muzeji/izlozbe",
                    rel: "izlozbe",
                    type: "GET"
                },
                {
                    href: "/api/v1/muzeji",
                    rel: "muzeji",
                    type: "GET"
                }
            ]
        });
    }
};


const updateIzlozba = (req, res) => {
    try {
        const idIzlozbe = parseInt(req.params.id);
        const { idizlozbe, nazivizlozbe, datumpocetka, datumzavrsetka, opis, vrstaizlozbe, idmuzeja } = req.body;

        if (idizlozbe !== undefined) {
            const response = {
                status: "Bad Request",
                message: "Izlozba's ID cannot be changed",
                response: null,
                links: [
                    {
                        href: "/api/v1/muzeji/izlozbe",
                        rel: "izlozbe",
                        type: "GET"
                    },
                    {
                        href: "/api/v1/muzeji",
                        rel: "muzeji",
                        type: "GET"
                    }
                ]
            };
            return res.status(400).json(response);
        }

        pool.query("SELECT * FROM izlozba WHERE idIzlozbe = $1", [idIzlozbe], async (error, results) => {
            try {
                if (error) {
                    throw new Error("An error occurred while checking for existing izlozba");
                }

                if (results.rows.length === 0) {
                    return res.status(404).json({
                        status: "Not Found",
                        message: "Izlozba not found",
                        response: null,
                        links: [
                            {
                                href: "/api/v1/muzeji/izlozbe",
                                rel: "izlozbe",
                                type: "GET"
                            },
                            {
                                href: "/api/v1/muzeji",
                                rel: "muzeji",
                                type: "GET"
                            }
                        ]
                    });
                }

                await pool.query(
                    "UPDATE izlozba SET nazivizlozbe = $1, datumpocetka = $2, datumzavrsetka = $3, opis = $4, vrstaizlozbe = $5, idmuzeja = $6 WHERE idIzlozbe = $7",
                    [nazivizlozbe, datumpocetka, datumzavrsetka, opis, vrstaizlozbe, idmuzeja, idIzlozbe]
                );

                res.status(200).json({
                    status: "OK",
                    message: "Izlozba updated successfully",
                    response: null,
                    links: [
                        {
                            href: "/api/v1/muzeji/izlozbe",
                            rel: "izlozbe",
                            type: "GET"
                        },
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        }
                    ]
                });
            } catch (error) {
                res.status(500).json({
                    status: "Error",
                    message: "An error occurred while updating izlozba",
                    error: error.message,
                    links: [
                        {
                            href: "/api/v1/muzeji/izlozbe",
                            rel: "izlozbe",
                            type: "GET"
                        },
                        {
                            href: "/api/v1/muzeji",
                            rel: "muzeji",
                            type: "GET"
                        }
                    ]
                });
            }
        });
    } catch (exception) {
        const response = {
            status: "Error",
            message: "An unexpected error occurred.",
            error: exception.message,
            links: [
                {
                    href: "/api/v1/muzeji/izlozbe",
                    rel: "izlozbe",
                    type: "GET"
                },
                {
                    href: "/api/v1/muzeji",
                    rel: "muzeji",
                    type: "GET"
                }
            ]
        };
        res.status(500).json(response);
    }
};


module.exports = {
    getMuzeji,
    getMuzejById,
    getIzlozbe,
    getIzlozbaById,
    getIzlozbaByOpis,
    addIzlozba,
    deleteIzlozba,
    updateIzlozba
};