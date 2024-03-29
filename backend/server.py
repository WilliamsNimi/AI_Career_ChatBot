#!/usr/bin/python3
from getpass import getpass
from langchain_community.llms import Replicate
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from flask import Flask
from flask_cors import CORS
import os
from flask import jsonify
from flask import request


app = Flask(__name__)
cors = CORS(app)


@app.route('/query', methods=['POST', 'GET'])
def make_query():
    """This function gets the query from the frontend and calls the call_llama function"""
    query = request.get_json()
    return jsonify({'results':call_llama(query['query'], query['firstname'], query['skills'])})


@app.route('/')
def index():
    """ This function will be deleted """
    question = make_query()
    print(question['query'])
    return jsonify({'results':call_llama(question['query'])})

def call_llama(question, firstname, skills):
    """This function calls the Llama 13b API and sends a question  to it
    output: Answer from the model
    """
    base_case = "My name is "+firstname+ " and I have the following skills " + skills
    password = os.environ.get('REPLICATE_API_TOKEN')

    llama2_13b = "meta/llama-2-13b-chat:f4e2de70d66816a838a89eeeb621910adffb0dd0baba3976c96980970978018d"
    llm = Replicate(replicate_api_token=password,
        model=llama2_13b,
        model_kwargs={"temperature": 0.01, "top_p": 1, "max_new_tokens":500}
    )
    answer = llm(base_case)

    """# chat history not passed so Llama doesn't have the context and doesn't know this is more about the book
    followup = "tell me more"
    followup_answer = llm(followup) """

    memory = ConversationBufferMemory()
    conversation = ConversationChain(
        llm=llm, 
        memory = memory,
        verbose=False
    )
    answer = conversation.predict(input=base_case)

    # pass context (previous question and answer) along with the follow up "tell me more" to Llama who now knows more of what
    memory.save_context({"input": base_case},
                        {"output": answer})
    followup_answer = conversation.predict(input=question)
    return (followup_answer)


if __name__ == '__main__':
    app.run(debug=True)

