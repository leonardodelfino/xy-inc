module.exports = {
    entity: {
        record: {
            "name": "employee",
            "attributes": [
                {
                    "name": "name",
                    "type": "string",
                    "required": true
                },
                {
                    "name": "birth_date",
                    "type": "date"
                },
                {
                    "name": "childrens",
                    "type": "number"
                },
                {
                    "name": "blue_eyes",
                    "type": "boolean"
                }
            ]
        },
        anotherRecord: {
            "name": "departament",
            "attributes": [
                {
                    "name": "name",
                    "type": "string",
                    "required": true
                },
                {
                    "name": "employees",
                    "type": "int"
                }
            ]
        },
        duplicatedRecord: {
            "name": "class",
            "attributes": [
                {
                    "name": "name",
                    "type": "TEXTO",
                    "required": true
                }
            ]
        },
        reservedRecord : {
            "name": "entity",
            "attributes": []
        },
    },

    employee: {
        record: {
            "name": "John",
            "birth_date": "1947-07-30",
            "childrens": 3,
            "blue_eyes": false
        },
        update: {
            "name": "Paul"
        },
        invalidRecord: {
            "name": "John",
            "birth_date": 22,
            "childrens": "n/a",
            "blue_eyes": false
        },
        requiredField: {
            "birth_date": "1947-07-30",
            "childrens": 3,
            "blue_eyes": false
        }
    }
}