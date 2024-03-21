import asyncio

from pprint import pprint
from utils.stream import process_data_stream, AioStream

async def main() -> None:
    print('Processing stream...')
    result: list = await process_data_stream()
    print('Stream processed.')
    pprint(result)

    stream = AioStream()
    await asyncio.gather(
        stream.on('./mock/test-tube.png', lambda chunk: print(len(chunk))),
        stream.pipe('./mock/test-tube.png', './mock/test-tube-copy.png')
    )

asyncio.run(main())

