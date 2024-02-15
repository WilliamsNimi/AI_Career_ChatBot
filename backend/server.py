#!/usr/bin/python3
from getpass import getpass
from langchain_community.llms import Replicate
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from flask import Flask
import os

app = Flask(__name__)
@app.route('/')
def index():
    #return call_llama()
    return {'results':"trial"}

"""def call_llama():
    REPLICATE_API_TOKEN = getpass()
    os.environ["REPLICATE_API_TOKEN"] = REPLICATE_API_TOKEN


    llama2_13b = "meta/llama-2-13b-chat:f4e2de70d66816a838a89eeeb621910adffb0dd0baba3976c96980970978018d"
    llm = Replicate(
        model=llama2_13b,
        model_kwargs={"temperature": 0.01, "top_p": 1, "max_new_tokens":500}
    )
    question = "who wrote the book Innovator's dilemma?"
    answer = llm(question)

    # chat history not passed so Llama doesn't have the context and doesn't know this is more about the book
    followup = "tell me more"
    followup_answer = llm(followup)

    memory = ConversationBufferMemory()
    conversation = ConversationChain(
        llm=llm, 
        memory = memory,
        verbose=False
    )
    answer = conversation.predict(input=question)

    # pass context (previous question and answer) along with the follow up "tell me more" to Llama who now knows more of what
    memory.save_context({"input": question},
                        {"output": answer})
    followup_answer = conversation.predict(input=followup) """
    #return ({"answer":"Trial"})


if __name__ == '__main__':
    app.run(debug=True)

